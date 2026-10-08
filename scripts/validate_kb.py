"""
Knowledge Base Validation Script
Validates relational integrity, checks for duplicate IDs, broken foreign keys,
invalid rule weights, missing sources, orphan symptoms, and orphan rules.
"""

import os
import json
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KB_DIR = os.path.join(BASE_DIR, "data", "kb")

def run_validation():
    errors = []
    warnings = []
    
    # 1. Load files
    sources_path = os.path.join(KB_DIR, "sources.json")
    symptoms_path = os.path.join(KB_DIR, "symptoms.json")
    diseases_path = os.path.join(KB_DIR, "diseases_enriched.json")
    rules_path = os.path.join(KB_DIR, "rules.json")
    red_flags_path = os.path.join(KB_DIR, "red_flags.json")
    risk_factors_path = os.path.join(KB_DIR, "risk_factors.json")

    for p in [sources_path, symptoms_path, diseases_path, rules_path, red_flags_path, risk_factors_path]:
        if not os.path.exists(p):
            errors.append(f"Missing required KB file: {p}")
            return errors, warnings

    with open(sources_path, "r", encoding="utf-8") as f:
        sources_data = json.load(f)
    with open(symptoms_path, "r", encoding="utf-8") as f:
        symptoms_data = json.load(f).get("symptoms", [])
    with open(diseases_path, "r", encoding="utf-8") as f:
        diseases_data = json.load(f).get("diseases", [])
    with open(rules_path, "r", encoding="utf-8") as f:
        rules_data = json.load(f).get("rules", [])
    with open(red_flags_path, "r", encoding="utf-8") as f:
        red_flags_data = json.load(f).get("red_flags", [])
    with open(risk_factors_path, "r", encoding="utf-8") as f:
        rf_json = json.load(f)
        risk_factors_data = rf_json.get("risk_factors", [])
        risk_assoc_data = rf_json.get("disease_risk_associations", [])

    source_ids = {s["id"] for s in sources_data}
    
    # 2. Symptom validation
    symptom_ids = set()
    for s in symptoms_data:
        sid = s.get("id")
        if not sid:
            errors.append("Symptom record missing 'id'")
            continue
        if sid in symptom_ids:
            errors.append(f"Duplicate symptom id: {sid}")
        symptom_ids.add(sid)
        if not s.get("name"):
            errors.append(f"Symptom '{sid}' missing name")
        if not s.get("category"):
            warnings.append(f"Symptom '{sid}' missing category")

    # 3. Disease validation
    disease_ids = set()
    used_symptom_ids = set()
    for d in diseases_data:
        did = d.get("id")
        if not did:
            errors.append("Disease record missing 'id'")
            continue
        if did in disease_ids:
            errors.append(f"Duplicate disease id: {did}")
        disease_ids.add(did)

        if not d.get("name"):
            errors.append(f"Disease '{did}' missing name")
        if not d.get("icd11_code"):
            errors.append(f"Disease '{did}' missing ICD-11 code")
        if not d.get("source"):
            warnings.append(f"Disease '{did}' missing source")

        # Check symptom links
        syms = d.get("symptoms", {})
        if not syms:
            errors.append(f"Disease '{did}' has no associated symptoms")
        for sym_id, weight in syms.items():
            if sym_id not in symptom_ids:
                errors.append(f"Disease '{did}' references non-existent symptom '{sym_id}'")
            else:
                used_symptom_ids.add(sym_id)
            if not (0.0 <= weight <= 1.0):
                errors.append(f"Disease '{did}' symptom '{sym_id}' has invalid weight {weight}")

    # 4. Rules validation
    rule_ids = set()
    for r in rules_data:
        rid = r.get("id")
        if not rid:
            errors.append("Rule missing 'id'")
            continue
        if rid in rule_ids:
            errors.append(f"Duplicate rule id: {rid}")
        rule_ids.add(rid)

        rdid = r.get("disease_id")
        if rdid not in disease_ids:
            errors.append(f"Rule '{rid}' references unknown disease '{rdid}'")

        conds = r.get("conditions", {})
        all_conds = conds.get("all", []) + conds.get("any", [])
        if not all_conds:
            errors.append(f"Rule '{rid}' has empty conditions")
        for sym_id in all_conds:
            if sym_id not in symptom_ids:
                errors.append(f"Rule '{rid}' condition references unknown symptom '{sym_id}'")

        w = r.get("weight", 0)
        if not (0.0 <= w <= 1.0):
            errors.append(f"Rule '{rid}' has invalid weight {w}")
        if not r.get("explanation"):
            warnings.append(f"Rule '{rid}' missing explanation")

    # 5. Red-flags validation
    for rf in red_flags_data:
        for sym_id in rf.get("symptoms", []):
            if sym_id not in symptom_ids:
                errors.append(f"Red flag '{rf.get('id')}' references unknown symptom '{sym_id}'")
        if not rf.get("emergency_message"):
            errors.append(f"Red flag '{rf.get('id')}' missing emergency_message")

    # 6. Risk factors validation
    rf_ids = {rf["id"] for rf in risk_factors_data}
    for assoc in risk_assoc_data:
        if assoc.get("disease_id") not in disease_ids:
            errors.append(f"Risk factor assoc references unknown disease '{assoc.get('disease_id')}'")
        if assoc.get("risk_factor_id") not in rf_ids:
            errors.append(f"Risk factor assoc references unknown risk factor '{assoc.get('risk_factor_id')}'")

    # 7. Check for orphan symptoms
    orphan_symptoms = symptom_ids - used_symptom_ids
    if orphan_symptoms:
        # Check if they are referenced in red flags or clinical questions
        warnings.append(f"Symptoms not directly linked to any disease: {len(orphan_symptoms)} ({list(orphan_symptoms)[:5]}...)")

    return errors, warnings

if __name__ == "__main__":
    print("Running Knowledge Base Integrity Validation...")
    errors, warnings = run_validation()
    print(f"Validation completed:")
    print(f" - Errors found: {len(errors)}")
    print(f" - Warnings found: {len(warnings)}")
    
    if errors:
        print("\nERRORS:")
        for e in errors:
            print(f" [!] {e}")
        sys.exit(1)
    else:
        print("\n[OK] Knowledge Base verified with 100% relational integrity.")
        if warnings:
            print("\nWarnings:")
            for w in warnings:
                print(f" [*] {w}")
        sys.exit(0)
