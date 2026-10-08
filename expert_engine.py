"""
MedExpert Clinical Expert Engine
Production-grade deterministic rule engine, red-flag triage, differential ranking,
and step-by-step explainable reasoning traces.
"""

import os
import json
import sqlite3
import re
from typing import List, Dict, Any, Optional

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "data", "medical_kb.db")
KB_DIR = os.path.join(BASE_DIR, "data", "kb")

class ClinicalExpertEngine:
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self._load_memory_kb()

    def _load_memory_kb(self):
        """Loads normalized entities into memory for ultra-fast deterministic evaluation."""
        with open(os.path.join(KB_DIR, "symptoms.json"), "r", encoding="utf-8") as f:
            self.symptoms = {s["id"]: s for s in json.load(f).get("symptoms", [])}
        
        with open(os.path.join(KB_DIR, "diseases_enriched.json"), "r", encoding="utf-8") as f:
            self.diseases = {d["id"]: d for d in json.load(f).get("diseases", [])}

        with open(os.path.join(KB_DIR, "rules.json"), "r", encoding="utf-8") as f:
            self.rules = json.load(f).get("rules", [])

        with open(os.path.join(KB_DIR, "red_flags.json"), "r", encoding="utf-8") as f:
            self.red_flags = json.load(f).get("red_flags", [])

        with open(os.path.join(KB_DIR, "risk_factors.json"), "r", encoding="utf-8") as f:
            rf_full = json.load(f)
            self.risk_factors = {rf["id"]: rf for rf in rf_full.get("risk_factors", [])}
            self.disease_risk_associations = rf_full.get("disease_risk_associations", [])

    def evaluate_red_flags(self, reported_symptoms: List[str]) -> List[Dict[str, Any]]:
        """
        Safety-first Red Flag Evaluator.
        Overrides or flags assessment if high-urgency conditions are detected.
        """
        symptom_set = set(reported_symptoms)
        triggered_flags = []

        for rf in self.red_flags:
            mode = rf.get("match_mode", "any")
            matched = False
            matched_symptoms = []

            if mode == "any":
                for s in rf.get("symptoms", []):
                    if s in symptom_set:
                        matched = True
                        matched_symptoms.append(s)
            elif mode == "condition_group":
                for group in rf.get("conditions", []):
                    if "any" in group:
                        m = [s for s in group["any"] if s in symptom_set]
                        if m:
                            matched = True
                            matched_symptoms.extend(m)
                            break
                    if "all" in group:
                        if all(s in symptom_set for s in group["all"]):
                            matched = True
                            matched_symptoms.extend(group["all"])
                            break

            if matched:
                triggered_flags.append({
                    "id": rf["id"],
                    "name": rf["name"],
                    "severity": rf["severity"],
                    "matched_symptoms": sorted(list(set(matched_symptoms))),
                    "emergency_message": rf["emergency_message"],
                    "action": rf["action"],
                    "source": rf.get("source"),
                    "source_url": rf.get("source_url")
                })

        return triggered_flags

    def evaluate_differential(
        self,
        reported_symptoms: List[str],
        patient_info: Optional[Dict[str, Any]] = None,
        clinical_answers: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Forward-Chaining Clinical Diagnostic Evaluation.
        Computes weighted differential assessment, rule activations, and explainable audit trail.
        """
        patient_info = patient_info or {}
        clinical_answers = clinical_answers or {}
        
        # 1. Expand symptoms via parent-child inheritance (e.g. high_fever -> fever)
        active_symptoms = set(reported_symptoms)
        for s in list(active_symptoms):
            sym_obj = self.symptoms.get(s)
            if sym_obj and sym_obj.get("parent"):
                active_symptoms.add(sym_obj["parent"])

        # 2. Apply clinical question adjustments
        if clinical_answers.get("feverSeverity") == "high":
            active_symptoms.add("high_fever")
            active_symptoms.add("fever")
        elif clinical_answers.get("feverSeverity") == "mild":
            active_symptoms.add("mild_fever")
            active_symptoms.add("fever")
        elif clinical_answers.get("feverSeverity") == "none":
            active_symptoms.discard("fever")
            active_symptoms.discard("high_fever")
            active_symptoms.discard("mild_fever")

        if clinical_answers.get("coughType") == "productive":
            active_symptoms.add("productive_cough")
        elif clinical_answers.get("coughType") == "dry":
            active_symptoms.add("dry_cough")

        # 3. Check Red Flags First
        red_flags_triggered = self.evaluate_red_flags(list(active_symptoms))

        # 4. Evaluate Forward-Chaining Rules
        activated_rules = []
        rule_score_boost: Dict[str, float] = {}

        for rule in self.rules:
            conds = rule.get("conditions", {})
            exclusions = rule.get("exclusions", [])
            
            # Check exclusions
            if any(ex in active_symptoms for ex in exclusions):
                continue

            matches_all = True
            matched_symptoms = []

            if "all" in conds:
                if all(c in active_symptoms for c in conds["all"]):
                    matched_symptoms.extend(conds["all"])
                else:
                    matches_all = False

            if "any" in conds and matches_all:
                matched_any = [c for c in conds["any"] if c in active_symptoms]
                if matched_any:
                    matched_symptoms.extend(matched_any)
                else:
                    matches_all = False

            if matches_all and matched_symptoms:
                did = rule["disease_id"]
                rule_score_boost[did] = rule_score_boost.get(did, 0.0) + (rule.get("weight", 0.5) * 15.0)
                activated_rules.append({
                    "rule_id": rule["id"],
                    "disease_id": did,
                    "disease_name": self.diseases[did]["name"],
                    "weight": rule.get("weight"),
                    "matched_symptoms": matched_symptoms,
                    "explanation": rule.get("explanation"),
                    "source": rule.get("source"),
                    "source_url": rule.get("source_url")
                })

        # 5. Calculate Disease Evidence Scores
        results = []
        user_duration = clinical_answers.get("duration", "1-3d")
        patient_age = int(patient_info.get("age", 25))
        patient_gender = str(patient_info.get("gender", "Any")).lower()

        for did, disease in self.diseases.items():
            sym_weights = disease.get("symptoms", {})
            against_weights = disease.get("against", {})
            
            # Find positive matches
            matched = [s for s in sym_weights if s in active_symptoms]
            unmatched = [s for s in sym_weights if s not in active_symptoms]
            
            if not matched:
                continue

            matched_weight = sum(sym_weights[s] for s in matched)
            total_weight = sum(sym_weights.values())

            # Base confidence percentage
            base_score = (matched_weight / total_weight) * 100.0 if total_weight > 0 else 0

            # Penalties for symptoms arguing against
            penalty = 0.0
            penalized_symptoms = []
            for s, pen in against_weights.items():
                if s in active_symptoms:
                    penalty += (pen * 25.0)
                    penalized_symptoms.append(s)

            # Rule activation bonus
            rule_bonus = rule_score_boost.get(did, 0.0)

            # Duration consistency bonus/penalty
            duration_match = user_duration in disease.get("typical_duration", [])
            dur_adj = 4.0 if duration_match else -4.0

            # Demographics modifier
            demo_adj = 0.0
            sex_rel = disease.get("sex_relevance", "any")
            if sex_rel == "female_predominant" and patient_gender == "female":
                demo_adj += 2.0
            elif sex_rel == "male_predominant" and patient_gender == "male":
                demo_adj += 2.0

            final_score = base_score + rule_bonus - penalty + dur_adj + demo_adj
            final_score = max(5, min(96, round(final_score)))

            results.append({
                "disease_id": did,
                "disease": disease["name"],
                "category": disease.get("category"),
                "severity": disease.get("severity"),
                "icd11_code": disease.get("icd11_code"),
                "icd11_title": disease.get("icd11_title"),
                "confidence": int(final_score),
                "matched_symptoms": matched,
                "unmatched_symptoms": unmatched,
                "penalized_symptoms": penalized_symptoms,
                "matched_weight": round(matched_weight, 2),
                "total_weight": round(total_weight, 2),
                "description": disease.get("description"),
                "source": disease.get("source"),
                "source_url": disease.get("source_url"),
                "rules_activated": [r for r in activated_rules if r["disease_id"] == did]
            })

        # Sort descending by evidence score
        results.sort(key=lambda x: x["confidence"], reverse=True)

        top_match = results[0] if results else None
        differentials = results[1:5] if len(results) > 1 else []

        return {
            "status": "success",
            "red_flags": red_flags_triggered,
            "has_red_flags": len(red_flags_triggered) > 0,
            "top_match": top_match,
            "differentials": differentials,
            "all_matches": results,
            "rules_activated_count": len(activated_rules),
            "activated_rules": activated_rules,
            "evaluated_symptoms_count": len(reported_symptoms),
            "disclaimer": "This system provides preliminary, rule-based decision support for educational and informational purposes. It is not a medical diagnosis and does not replace evaluation by a qualified healthcare professional."
        }

    def search_symptoms(self, query: str, category: Optional[str] = None, limit: int = 15) -> List[Dict[str, Any]]:
        """
        High performance indexed search for symptoms with typo tolerance and alias lookup.
        """
        query_clean = query.strip().lower()
        if not query_clean and not category:
            return list(self.symptoms.values())[:limit]

        matches = []
        for sid, s in self.symptoms.items():
            if category and category != "All" and s.get("category") != category:
                continue

            name = s.get("name", "").lower()
            aliases = [a.lower() for a in s.get("aliases", [])]

            score = 0
            if query_clean == name or query_clean in aliases or query_clean == sid:
                score = 100
            elif name.startswith(query_clean):
                score = 80
            elif query_clean in name:
                score = 60
            elif any(query_clean in a for a in aliases):
                score = 50
            elif len(query_clean) >= 3 and (name.startswith(query_clean[:3]) or sid.startswith(query_clean[:3])):
                score = 40
            elif len(query_clean) >= 4 and any(a.startswith(query_clean[:3]) for a in aliases):
                score = 35
            else:
                # Character edit distance / similarity ratio
                import difflib
                ratio = difflib.SequenceMatcher(None, query_clean, name).ratio()
                if ratio > 0.65:
                    score = int(ratio * 50)
                else:
                    for a in aliases:
                        aratio = difflib.SequenceMatcher(None, query_clean, a).ratio()
                        if aratio > 0.65:
                            score = max(score, int(aratio * 50))

            if score > 0 or not query_clean:
                matches.append((score, s))

        matches.sort(key=lambda x: x[0], reverse=True)
        return [m[1] for m in matches[:limit]]

    def get_kb_statistics(self) -> Dict[str, Any]:
        """Calculates exact real numbers directly from the active verified knowledge base."""
        conn = sqlite3.connect(self.db_path)
        cur = conn.cursor()
        
        disease_count = cur.execute("SELECT COUNT(*) FROM diseases").fetchone()[0]
        symptom_count = cur.execute("SELECT COUNT(*) FROM symptoms").fetchone()[0]
        rule_count = cur.execute("SELECT COUNT(*) FROM rules").fetchone()[0]
        source_count = cur.execute("SELECT COUNT(*) FROM sources").fetchone()[0]
        rf_count = cur.execute("SELECT COUNT(*) FROM red_flags").fetchone()[0]
        verified_count = cur.execute("SELECT COUNT(*) FROM diseases WHERE verification_status='verified'").fetchone()[0]
        
        conn.close()

        pct_verified = round((verified_count / disease_count * 100)) if disease_count > 0 else 0

        return {
            "diseases": disease_count,
            "symptoms": symptom_count,
            "rules": rule_count,
            "sources": source_count,
            "red_flags": rf_count,
            "verified_records_percent": f"{pct_verified}%",
            "unverified_records": disease_count - verified_count,
            "version": "2.0.0",
            "data_sources": ["WHO ICD-11", "NLM Clinical Tables", "MedlinePlus", "CDC", "NIH"]
        }
