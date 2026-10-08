"""
SQLite Knowledge Base Compiler & FTS5 Full-Text Search Indexer
Builds a persistent, high-performance normalized SQLite database
for offline queries, rapid symptom search, and admin inspection.
"""

import os
import json
import sqlite3

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KB_DIR = os.path.join(BASE_DIR, "data", "kb")
DB_PATH = os.path.join(BASE_DIR, "data", "medical_kb.db")

def build_database():
    print(f"Building normalized SQLite Knowledge Base at {DB_PATH}...")
    if os.path.exists(DB_PATH):
        try:
            os.remove(DB_PATH)
        except Exception:
            pass

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # Schema definition
    cur.executescript("""
    CREATE TABLE sources (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        url TEXT,
        publisher TEXT,
        kind TEXT,
        license_note TEXT,
        integration TEXT
    );

    CREATE TABLE diseases (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        normalized_name TEXT,
        category TEXT,
        severity TEXT,
        description TEXT,
        icd11_code TEXT,
        icd11_title TEXT,
        snomed_code TEXT,
        aliases TEXT,
        age_groups TEXT,
        sex_relevance TEXT,
        typical_duration TEXT,
        source TEXT,
        source_url TEXT,
        last_verified TEXT,
        verification_status TEXT
    );

    CREATE TABLE symptoms (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        normalized_name TEXT,
        category TEXT,
        parent TEXT,
        aliases TEXT,
        source TEXT,
        source_url TEXT
    );

    CREATE TABLE disease_symptoms (
        disease_id TEXT NOT NULL,
        symptom_id TEXT NOT NULL,
        association_strength REAL NOT NULL,
        evidence_type TEXT,
        source TEXT,
        PRIMARY KEY (disease_id, symptom_id),
        FOREIGN KEY (disease_id) REFERENCES diseases(id),
        FOREIGN KEY (symptom_id) REFERENCES symptoms(id)
    );

    CREATE TABLE disease_exclusions (
        disease_id TEXT NOT NULL,
        symptom_id TEXT NOT NULL,
        penalty REAL NOT NULL,
        PRIMARY KEY (disease_id, symptom_id)
    );

    CREATE TABLE rules (
        id TEXT PRIMARY KEY,
        disease_id TEXT NOT NULL,
        conditions TEXT NOT NULL,
        exclusions TEXT,
        weight REAL NOT NULL,
        severity TEXT,
        priority INTEGER,
        explanation TEXT,
        source TEXT,
        source_url TEXT,
        FOREIGN KEY (disease_id) REFERENCES diseases(id)
    );

    CREATE TABLE red_flags (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        severity TEXT NOT NULL,
        symptoms TEXT NOT NULL,
        conditions TEXT,
        match_mode TEXT,
        emergency_message TEXT NOT NULL,
        action TEXT NOT NULL,
        source TEXT,
        source_url TEXT
    );

    CREATE TABLE risk_factors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        description TEXT
    );

    CREATE TABLE disease_risk_factors (
        disease_id TEXT NOT NULL,
        risk_factor_id TEXT NOT NULL,
        weight REAL NOT NULL,
        source TEXT,
        PRIMARY KEY (disease_id, risk_factor_id)
    );

    -- FTS5 Full-text search index for symptoms
    CREATE VIRTUAL TABLE symptoms_fts USING fts5(
        symptom_id,
        name,
        aliases,
        category
    );

    -- FTS5 Full-text search index for diseases
    CREATE VIRTUAL TABLE diseases_fts USING fts5(
        disease_id,
        name,
        aliases,
        icd11_code,
        category,
        description
    );
    """)

    # Load and insert data
    # 1. Sources
    with open(os.path.join(KB_DIR, "sources.json"), "r", encoding="utf-8") as f:
        sources_data = json.load(f)
    for s in sources_data:
        cur.execute("INSERT INTO sources VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (s["id"], s["name"], s.get("url"), s.get("publisher"), s.get("kind"), s.get("license_note"), s.get("integration")))

    # 2. Symptoms
    with open(os.path.join(KB_DIR, "symptoms.json"), "r", encoding="utf-8") as f:
        syms_data = json.load(f).get("symptoms", [])
    for s in syms_data:
        aliases_str = ", ".join(s.get("aliases", []))
        cur.execute("INSERT INTO symptoms VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    (s["id"], s["name"], s["name"].lower(), s.get("category"), s.get("parent"),
                     aliases_str, s.get("source"), s.get("source_url")))
        cur.execute("INSERT INTO symptoms_fts VALUES (?, ?, ?, ?)",
                    (s["id"], s["name"], aliases_str, s.get("category", "")))

    # 3. Diseases & Associations
    with open(os.path.join(KB_DIR, "diseases_enriched.json"), "r", encoding="utf-8") as f:
        dis_data = json.load(f).get("diseases", [])
    for d in dis_data:
        aliases_str = ", ".join(d.get("aliases", []))
        cur.execute("""INSERT INTO diseases VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                    (d["id"], d["name"], d.get("normalized_name"), d.get("category"), d.get("severity"),
                     d.get("description"), d.get("icd11_code"), d.get("icd11_title"), d.get("snomed_code"),
                     aliases_str, json.dumps(d.get("age_groups", [])), d.get("sex_relevance"),
                     json.dumps(d.get("typical_duration", [])), d.get("source"), d.get("source_url"),
                     d.get("last_verified"), d.get("verification_status")))
        cur.execute("INSERT INTO diseases_fts VALUES (?, ?, ?, ?, ?, ?)",
                    (d["id"], d["name"], aliases_str, d.get("icd11_code", ""), d.get("category", ""), d.get("description", "")))

        # Disease symptoms
        for sym_id, wt in d.get("symptoms", {}).items():
            cur.execute("INSERT INTO disease_symptoms VALUES (?, ?, ?, ?, ?)",
                        (d["id"], sym_id, wt, "expert_curated_heuristic", d.get("source")))
        for sym_id, pen in d.get("against", {}).items():
            cur.execute("INSERT INTO disease_exclusions VALUES (?, ?, ?)",
                        (d["id"], sym_id, pen))

    # 4. Rules
    with open(os.path.join(KB_DIR, "rules.json"), "r", encoding="utf-8") as f:
        rules_data = json.load(f).get("rules", [])
    for r in rules_data:
        cur.execute("INSERT INTO rules VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (r["id"], r["disease_id"], json.dumps(r.get("conditions", {})),
                     json.dumps(r.get("exclusions", [])), r.get("weight", 0.0),
                     r.get("severity"), r.get("priority", 1), r.get("explanation"),
                     r.get("source"), r.get("source_url")))

    # 5. Red Flags
    with open(os.path.join(KB_DIR, "red_flags.json"), "r", encoding="utf-8") as f:
        rf_data = json.load(f).get("red_flags", [])
    for rf in rf_data:
        cur.execute("INSERT INTO red_flags VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (rf["id"], rf["name"], rf["severity"], json.dumps(rf.get("symptoms", [])),
                     json.dumps(rf.get("conditions", [])), rf.get("match_mode", "any"),
                     rf["emergency_message"], rf["action"], rf.get("source"), rf.get("source_url")))

    # 6. Risk factors
    with open(os.path.join(KB_DIR, "risk_factors.json"), "r", encoding="utf-8") as f:
        rf_full = json.load(f)
        for rf in rf_full.get("risk_factors", []):
            cur.execute("INSERT INTO risk_factors VALUES (?, ?, ?, ?)",
                        (rf["id"], rf["name"], rf.get("category"), rf.get("description")))
        for assoc in rf_full.get("disease_risk_associations", []):
            cur.execute("INSERT INTO disease_risk_factors VALUES (?, ?, ?, ?)",
                        (assoc["disease_id"], assoc["risk_factor_id"], assoc.get("weight", 0.0), assoc.get("source")))

    conn.commit()
    conn.close()
    print("[OK] Normalized SQLite Knowledge Base successfully generated with full FTS5 search index.")

if __name__ == "__main__":
    build_database()
