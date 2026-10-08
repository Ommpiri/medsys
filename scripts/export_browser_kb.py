"""
Compile Normalized Knowledge Base into JSON/JS bundle for offline browser usability.
Generates js/kb-data.js so the client-side rule-based expert engine runs
entirely client-side or offline without mandatory backend requests.
"""

import os
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KB_DIR = os.path.join(BASE_DIR, "data", "kb")
JS_DIR = os.path.join(BASE_DIR, "js")

def export_browser_kb():
    with open(os.path.join(KB_DIR, "symptoms.json"), "r", encoding="utf-8") as f:
        symptoms = json.load(f).get("symptoms", [])

    with open(os.path.join(KB_DIR, "diseases_enriched.json"), "r", encoding="utf-8") as f:
        diseases = json.load(f).get("diseases", [])

    with open(os.path.join(KB_DIR, "rules.json"), "r", encoding="utf-8") as f:
        rules = json.load(f).get("rules", [])

    with open(os.path.join(KB_DIR, "red_flags.json"), "r", encoding="utf-8") as f:
        red_flags = json.load(f).get("red_flags", [])

    with open(os.path.join(KB_DIR, "clinical_questions.json"), "r", encoding="utf-8") as f:
        questions = json.load(f).get("clinical_questions", [])

    with open(os.path.join(KB_DIR, "sources.json"), "r", encoding="utf-8") as f:
        sources = json.load(f)

    # Transform symptoms to format compatible with UI
    formatted_symptoms = []
    for s in symptoms:
        formatted_symptoms.append({
            "id": s["id"],
            "label": s["name"],
            "category": s.get("category", "General"),
            "aliases": s.get("aliases", []),
            "parent": s.get("parent"),
            "source": s.get("source"),
            "source_url": s.get("source_url")
        })

    # Transform diseases dictionary for backward-compatibility + new normalized fields
    formatted_kb = {}
    for d in diseases:
        name = d["name"]
        formatted_kb[name] = {
            "id": d["id"],
            "disease_id": d["id"],
            "name": d["name"],
            "description": d.get("description", ""),
            "category": d.get("category", "General"),
            "severity": d.get("severity", "moderate"),
            "urgency": d.get("severity", "moderate").capitalize(),
            "icd11_code": d.get("icd11_code", "CA40"),
            "icd11_title": d.get("icd11_title", name),
            "icd10_codes": d.get("icd10_codes", []),
            "snomed_code": d.get("snomed_code"),
            "aliases": d.get("aliases", []),
            "source": d.get("source", "WHO ICD-11 / NLM Clinical Tables"),
            "source_url": d.get("source_url", "https://medlineplus.gov/"),
            "last_verified": d.get("last_verified", "2026-10-08"),
            "verification_status": d.get("verification_status", "verified"),
            "symptoms": d.get("symptoms", {}),
            "against": d.get("against", {}),
            "typical_duration": d.get("typical_duration", []),
            "rules": [r for r in rules if r.get("disease_id") == d["id"]],
            "advice": "Consult a qualified physician for evaluation and personalized clinical management."
        }

    out_file = os.path.join(JS_DIR, "kb-data.js")
    with open(out_file, "w", encoding="utf-8") as f:
        f.write("/**\n * MedExpert Normalized Knowledge Base Bundle (v2.0.0)\n * Authoritative WHO ICD-11 & NLM Clinical Tables enriched clinical dataset.\n */\n\n")
        f.write(f"window.MEDEXPERT_VERSION = '2.0.0';\n")
        f.write(f"window.SYMPTOMS_DATA = {json.dumps(formatted_symptoms, indent=2)};\n\n")
        f.write(f"window.KNOWLEDGE_BASE = {json.dumps(formatted_kb, indent=2)};\n\n")
        f.write(f"window.RED_FLAGS_DATA = {json.dumps(red_flags, indent=2)};\n\n")
        f.write(f"window.CLINICAL_QUESTIONS_DATA = {json.dumps(questions, indent=2)};\n\n")
        f.write(f"window.SOURCES_DATA = {json.dumps(sources, indent=2)};\n")

    print(f"Exported client-side Knowledge Base bundle to {out_file}")

if __name__ == "__main__":
    export_browser_kb()
