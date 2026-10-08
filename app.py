"""
Clinical Rule-Based Expert System for Preliminary Disease Diagnosis
Standard Implementation conforming to Classical Knowledge-Based Systems (KBS).
"""

import gradio as gr

# ==============================================================================
# 1. KNOWLEDGE BASE (PRODUCTION RULES)
# ==============================================================================
# IF (patient has these symptoms) THEN (disease is likely)
# Weight: Importance factor of each symptom in the disease's diagnostic rule (0.0 - 1.0)
KNOWLEDGE_BASE = {
    "Common Cold": {
        "category": "Upper Respiratory Tract Infection",
        "urgency": "Low (Supportive Self-Care)",
        "symptoms": {
            "runny_nose": 0.9,
            "sneezing": 0.8,
            "sore_throat": 0.6,
            "mild_fever": 0.4,
            "cough": 0.5,
            "headache": 0.3,
        },
        "advice": "Rest, oral hydration, and over-the-counter symptomatic relief (saline rinses, decongestants). Seek medical evaluation if symptoms worsen or persist beyond 10 days."
    },
    "Influenza (Flu)": {
        "category": "Systemic Viral Infection",
        "urgency": "Moderate (Clinical Evaluation Recommended)",
        "symptoms": {
            "high_fever": 0.9,
            "body_ache": 0.8,
            "fatigue": 0.8,
            "cough": 0.6,
            "headache": 0.5,
            "chills": 0.7,
        },
        "advice": "Adequate bed rest, electrolyte hydration, and antiviral therapy (e.g., oseltamivir) if evaluated within 48 hours of onset. Seek prompt clinical care if dyspnea or severe weakness develops."
    },
    "COVID-19": {
        "category": "Lower Respiratory / Systemic Viral Syndrome",
        "urgency": "High (Testing & Close Monitoring)",
        "symptoms": {
            "fever": 0.7,
            "cough": 0.7,
            "loss_of_taste_smell": 0.9,
            "shortness_of_breath": 0.8,
            "fatigue": 0.5,
            "sore_throat": 0.4,
        },
        "advice": "Isolate immediately. Perform antigen or RT-PCR confirmatory testing. Continuously monitor SpO2 with a pulse oximeter. Seek emergency medical attention if SpO2 falls below 94% or breathing becomes labored."
    },
    "Migraine": {
        "category": "Neurological Cephalea Disorder",
        "urgency": "Moderate (Neurological / Outpatient Follow-up)",
        "symptoms": {
            "severe_headache": 0.9,
            "nausea": 0.6,
            "sensitivity_to_light": 0.8,
            "sensitivity_to_sound": 0.7,
            "visual_disturbance": 0.5,
        },
        "advice": "Rest in a quiet, dark environment. Administer prescribed abortive medications (triptans/NSAIDs) early in the attack. Maintain a headache diary and consult a neurologist if episodes become frequent."
    },
    "Typhoid": {
        "category": "Enteric Bacterial Infection",
        "urgency": "High (Antibiotic Regimen Required)",
        "symptoms": {
            "high_fever": 0.8,
            "abdominal_pain": 0.7,
            "weakness": 0.6,
            "loss_of_appetite": 0.6,
            "headache": 0.4,
            "constipation": 0.5,
        },
        "advice": "Immediate clinical consultation for diagnostic blood culture / Widal serology. Requires targeted antibiotic therapy, rigorous food/water hygiene, and careful electrolyte repletion."
    },
    "Dengue": {
        "category": "Vector-Borne Arboviral Infection",
        "urgency": "High (Monitor Platelets & Hemoconcentration)",
        "symptoms": {
            "high_fever": 0.8,
            "severe_headache": 0.6,
            "joint_pain": 0.8,
            "rash": 0.6,
            "nausea": 0.4,
            "fatigue": 0.5,
        },
        "advice": "Urgent CBC monitoring for thrombocytopenia and hematocrit shifts. Maintain vigorous hydration. Strictly avoid NSAIDs and aspirin due to hemorrhage risks; use paracetamol exclusively for fever."
    },
    "Gastroenteritis": {
        "category": "Gastrointestinal Enteric Infection",
        "urgency": "Moderate (Dehydration Risk)",
        "symptoms": {
            "diarrhea": 0.9,
            "vomiting": 0.7,
            "abdominal_pain": 0.6,
            "mild_fever": 0.3,
            "nausea": 0.6,
        },
        "advice": "Initiate Oral Rehydration Salts (ORS) in measured volumes. Adopt a bland BRAT diet. Seek immediate emergency care if intractable emesis, signs of severe dehydration, or hematochezia emerge."
    },
    "Asthma": {
        "category": "Chronic Airway Hypersensitivity / Reactive Airway",
        "urgency": "Critical (Potential Airway Compromise)",
        "symptoms": {
            "shortness_of_breath": 0.9,
            "wheezing": 0.9,
            "chest_tightness": 0.7,
            "cough": 0.5,
        },
        "advice": "Administer prescribed short-acting beta-agonist (SABA) rescue inhaler. Remove environmental triggers (allergens, smoke). If breathing does not improve within minutes or speaking full sentences is difficult, call emergency services immediately."
    },
    "Pneumonia": {
        "category": "Lower Respiratory Infection",
        "urgency": "High (Chest Imaging & Clinical Workup)",
        "symptoms": {
            "high_fever": 0.8,
            "cough": 0.8,
            "shortness_of_breath": 0.9,
            "chest_tightness": 0.7,
            "fatigue": 0.6,
        },
        "advice": "Consult a physician promptly for chest auscultation, pulse oximetry, and radiography. May require targeted antibiotic therapy or hospital admission."
    },
}

# Anatomical / Systemic groupings for clean clinical review
SYMPTOM_GROUPS = {
    "Systemic & Febrile": [
        ("high_fever", "High Fever (>= 38.9 deg C)"),
        ("mild_fever", "Mild Fever (37.5 - 38.3 deg C)"),
        ("fever", "Fever (Unspecified / Moderate)"),
        ("chills", "Chills & Rigors"),
        ("fatigue", "Generalized Fatigue / Lethargy"),
        ("weakness", "Muscle Weakness / Malaise"),
    ],
    "Respiratory & ENT": [
        ("cough", "Persistent Cough"),
        ("shortness_of_breath", "Shortness of Breath (Dyspnea)"),
        ("wheezing", "Wheezing / Expiratory Whistle"),
        ("chest_tightness", "Chest Tightness / Constriction"),
        ("runny_nose", "Rhinorrhea (Runny Nose)"),
        ("sneezing", "Frequent Sneezing"),
        ("sore_throat", "Sore Throat (Pharyngeal Erythema)"),
        ("loss_of_taste_smell", "Anosmia / Loss of Smell & Taste"),
    ],
    "Neurological & Sensory": [
        ("severe_headache", "Severe Throbbing Headache"),
        ("headache", "Dull / Moderate Headache"),
        ("sensitivity_to_light", "Photophobia (Light Sensitivity)"),
        ("sensitivity_to_sound", "Phonophobia (Sound Sensitivity)"),
        ("visual_disturbance", "Visual Aura / Blurring"),
    ],
    "Gastrointestinal & Abdominal": [
        ("abdominal_pain", "Abdominal Pain / Cramps"),
        ("diarrhea", "Watery Diarrhea"),
        ("vomiting", "Vomiting / Emesis"),
        ("nausea", "Nausea"),
        ("constipation", "Constipation"),
        ("loss_of_appetite", "Loss of Appetite (Anorexia)"),
    ],
    "Musculoskeletal & Dermatological": [
        ("body_ache", "Diffuse Body Ache (Myalgia)"),
        ("joint_pain", "Severe Joint Pain (Arthralgia)"),
        ("rash", "Cutaneous Skin Rash / Petechiae"),
    ],
}

SYMPTOM_LABEL_MAP = {
    code: label
    for group in SYMPTOM_GROUPS.values()
    for code, label in group
}

LABEL_TO_CODE = {v: k for k, v in SYMPTOM_LABEL_MAP.items()}
ALL_SYMPTOM_CODES = sorted(SYMPTOM_LABEL_MAP.keys())

# Realistic patient presentations for clinical demonstration
CLINICAL_PRESETS = {
    "Select Case Preset...": [],
    "Case 1: Viral Influenza Presentation": [
        "high_fever", "body_ache", "fatigue", "cough", "headache", "chills"
    ],
    "Case 2: COVID-19 Respiratory Presentation": [
        "fever", "cough", "loss_of_taste_smell", "shortness_of_breath", "fatigue"
    ],
    "Case 3: Classic Migraine with Aura": [
        "severe_headache", "nausea", "sensitivity_to_light", "sensitivity_to_sound", "visual_disturbance"
    ],
    "Case 4: Acute Infectious Gastroenteritis": [
        "diarrhea", "vomiting", "abdominal_pain", "mild_fever", "nausea"
    ],
    "Case 5: Bronchial Asthma Exacerbation": [
        "shortness_of_breath", "wheezing", "chest_tightness", "cough"
    ],
    "Case 6: Suspected Dengue Fever": [
        "high_fever", "severe_headache", "joint_pain", "rash", "fatigue"
    ],
    "Case 7: Typhoid Enteric Fever": [
        "high_fever", "abdominal_pain", "weakness", "loss_of_appetite", "constipation"
    ],
    "Case 8: Upper Respiratory Common Cold": [
        "runny_nose", "sneezing", "sore_throat", "cough", "mild_fever"
    ],
    "Case 9: Suspected Bacterial Pneumonia": [
        "high_fever", "cough", "shortness_of_breath", "chest_tightness", "fatigue"
    ],
}

# ==============================================================================
# 2. INFERENCE ENGINE (FORWARD CHAINING)
# ==============================================================================
def infer(patient_symptoms):
    """
    Evaluates reported symptoms against the Knowledge Base using forward chaining.
    Computes a weighted confidence metric:
        Confidence = (Sum of matched symptom weights) / (Total rule weights) * 100
    """
    results = []
    patient_set = set(patient_symptoms)

    for disease, data in KNOWLEDGE_BASE.items():
        rule_symptoms = data["symptoms"]
        matched = patient_set.intersection(rule_symptoms.keys())

        if not matched:
            continue

        matched_weight = sum(rule_symptoms[s] for s in matched)
        total_weight = sum(rule_symptoms.values())
        confidence = round((matched_weight / total_weight) * 100, 1)

        missing = sorted(list(set(rule_symptoms.keys()) - matched))
        sorted_matched = sorted(list(matched))

        trace = f"IF patient EXHIBITS [{', '.join(sorted_matched)}] -> THEN disease match '{disease}' [RULE FIRED]"

        results.append({
            "disease": disease,
            "category": data.get("category", "General"),
            "urgency": data.get("urgency", "Standard"),
            "confidence": confidence,
            "matched_weight": round(matched_weight, 2),
            "total_weight": round(total_weight, 2),
            "matched_symptoms": sorted_matched,
            "missing_symptoms": missing,
            "advice": data["advice"],
            "trace": trace,
        })

    results.sort(key=lambda x: x["confidence"], reverse=True)
    return results


# ==============================================================================
# 3. CLINICAL UI RENDERERS
# ==============================================================================
def get_urgency_badge_style(urgency_str):
    if "Critical" in urgency_str:
        return "background-color: rgba(239, 68, 68, 0.2); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.5);"
    elif "High" in urgency_str:
        return "background-color: rgba(249, 115, 22, 0.2); color: #fdba74; border: 1px solid rgba(249, 115, 22, 0.5);"
    elif "Moderate" in urgency_str:
        return "background-color: rgba(234, 179, 8, 0.2); color: #fde047; border: 1px solid rgba(234, 179, 8, 0.5);"
    else:
        return "background-color: rgba(34, 197, 94, 0.2); color: #86efac; border: 1px solid rgba(34, 197, 94, 0.5);"


def render_diagnostic_assessment(selected_symptom_labels):
    if not selected_symptom_labels:
        return """
        <div class="empty-state-card">
            <div class="empty-icon">i</div>
            <div class="empty-title">Awaiting Clinical Findings</div>
            <div class="empty-desc">
                Select observed patient symptoms from the systemic categories on the left,
                or load a clinical case preset above to initiate forward-chaining inference.
            </div>
        </div>
        """, "", ""

    # Convert labels back to machine keys
    reported_codes = [LABEL_TO_CODE[lbl] for lbl in selected_symptom_labels if lbl in LABEL_TO_CODE]
    results = infer(reported_codes)

    if not results:
        return """
        <div class="empty-state-card">
            <div class="empty-title">No Rule Conditions Satisfied</div>
            <div class="empty-desc">
                None of the production rules in the current knowledge base matched the selected combination of symptoms.
                Comprehensive in-person clinical diagnostic workup is advised.
            </div>
        </div>
        """, "", ""

    top = results[0]

    # Primary finding card
    top_bar_width = min(100, max(5, int(top['confidence'])))
    bar_color = "#2dd4bf" if top['confidence'] >= 50 else "#f59e0b" if top['confidence'] >= 30 else "#94a3b8"

    top_matched_pills = "".join(
        f'<span class="pill pill-matched">{SYMPTOM_LABEL_MAP.get(s, s)}</span>'
        for s in top["matched_symptoms"]
    )

    top_missing_pills = "".join(
        f'<span class="pill pill-missing">{SYMPTOM_LABEL_MAP.get(s, s)}</span>'
        for s in top["missing_symptoms"]
    ) if top["missing_symptoms"] else '<span class="pill pill-none">All rule criteria met</span>'

    badge_style = get_urgency_badge_style(top["urgency"])

    primary_html = f"""
    <div class="primary-diagnosis-card">
        <div class="primary-header">
            <div>
                <span class="eyebrow-tag">PRIMARY DIFFERENTIAL ESTIMATE</span>
                <h2 class="primary-title">{top['disease']}</h2>
                <span class="primary-category">{top['category']}</span>
            </div>
            <div class="score-container">
                <div class="score-value">{top['confidence']}%</div>
                <div class="score-label">Rule Confidence</div>
            </div>
        </div>

        <div class="progress-track">
            <div class="progress-bar" style="width: {top_bar_width}%; background-color: {bar_color};"></div>
        </div>

        <div class="metadata-strip">
            <div class="meta-item">
                <span class="meta-label">Clinical Urgency</span>
                <span class="urgency-badge" style="{badge_style}">{top['urgency']}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Matched Rule Weight</span>
                <span class="meta-val">{top['matched_weight']} / {top['total_weight']} pts</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Matching Criteria</span>
                <span class="meta-val">{len(top['matched_symptoms'])} matched of {len(top['matched_symptoms']) + len(top['missing_symptoms'])}</span>
            </div>
        </div>

        <div class="symptom-section">
            <div class="symptom-title">Confirmed Manifestations:</div>
            <div class="pill-group">{top_matched_pills}</div>
        </div>

        <div class="symptom-section">
            <div class="symptom-title">Unreported Condition Manifestations:</div>
            <div class="pill-group">{top_missing_pills}</div>
        </div>

        <div class="clinical-advisory-box">
            <div class="advisory-title">Recommended Clinical Action</div>
            <div class="advisory-content">{top['advice']}</div>
        </div>
    </div>
    """

    # Differential candidate table / rows
    diff_cards = []
    for rank, res in enumerate(results, start=1):
        is_lead = (rank == 1)
        res_matched = ", ".join([SYMPTOM_LABEL_MAP.get(s, s) for s in res["matched_symptoms"]])
        row_class = "diff-row lead-row" if is_lead else "diff-row"

        diff_cards.append(f"""
        <div class="{row_class}">
            <div class="diff-rank">#{rank}</div>
            <div class="diff-body">
                <div class="diff-title-row">
                    <span class="diff-name">{res['disease']}</span>
                    <span class="diff-score">{res['confidence']}%</span>
                </div>
                <div class="diff-details">
                    <span class="diff-cat">{res['category']}</span> &bull; 
                    <span class="diff-wt">Weight: {res['matched_weight']} / {res['total_weight']}</span>
                </div>
                <div class="diff-symptoms"><strong>Matched:</strong> {res_matched}</div>
                <div class="diff-advice"><strong>Protocol:</strong> {res['advice']}</div>
            </div>
        </div>
        """)

    differential_html = f"""
    <div class="differential-panel">
        <div class="panel-header">
            <h3>Ranked Differential Spectrum ({len(results)} Conditions Fired)</h3>
            <span class="panel-sub">Sorted in descending order of rule activation weights</span>
        </div>
        <div class="differential-list">
            {"".join(diff_cards)}
        </div>
    </div>
    """

    # Explanation Trace
    traces = []
    for rank, res in enumerate(results, start=1):
        traces.append(f"""
[{rank}] RULE FOR: {res['disease'].upper()}
    EVIDENCE: {res['matched_symptoms']}
    FORMAL TRACE: {res['trace']}
    CALCULATION: {res['matched_weight']} matched weight / {res['total_weight']} total rule weight = {res['confidence']}%
    -----------------------------------------------------------------------------------------""")

    explanation_text = "\n".join(traces)

    return primary_html, differential_html, explanation_text


def load_preset_case(preset_name):
    if not preset_name or preset_name not in CLINICAL_PRESETS:
        return []
    codes = CLINICAL_PRESETS[preset_name]
    labels = [SYMPTOM_LABEL_MAP[c] for c in codes if c in SYMPTOM_LABEL_MAP]
    return labels


# ==============================================================================
# ==============================================================================
# 4. CUSTOM STYLING (DARK CLINICAL AESTHETIC - ZERO WASHED-OUT CONTRAST)
# ==============================================================================
CUSTOM_CSS = """
/* Classical Clinical Dark Mode Dashboard */
:root, body, .gradio-container {
    --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-family: var(--font-stack) !important;
}

/* Base Container */
.gradio-container {
    background-color: #0b0f17 !important;
    color: #f9fafb !important;
}

/* Header Section */
.app-header {
    background: #111827 !important;
    border: 1px solid #1f2937 !important;
    padding: 24px 28px !important;
    margin-bottom: 20px !important;
    border-radius: 10px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
}

.header-top {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    margin-bottom: 8px !important;
}

.institution-tag {
    font-size: 11px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
    color: #2dd4bf !important;
    background: rgba(13, 148, 136, 0.25) !important;
    padding: 3px 10px !important;
    border-radius: 4px !important;
    border: 1px solid rgba(45, 212, 191, 0.45) !important;
}

.system-title {
    font-size: 26px !important;
    font-weight: 800 !important;
    color: #f9fafb !important;
    margin: 0 !important;
    letter-spacing: -0.02em !important;
}

.system-subtitle {
    font-size: 13.5px !important;
    color: #9ca3af !important;
    margin: 6px 0 0 0 !important;
    line-height: 1.5 !important;
}

/* Primary Diagnosis Card */
.primary-diagnosis-card {
    background: #111827 !important;
    border: 1px solid #1f2937 !important;
    border-radius: 10px !important;
    padding: 24px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
    margin-bottom: 20px !important;
}

.primary-header {
    display: flex !important;
    justify-content: space-between !important;
    align-items: flex-start !important;
}

.eyebrow-tag {
    font-size: 11px !important;
    font-weight: 700 !important;
    letter-spacing: 0.08em !important;
    color: #2dd4bf !important;
    text-transform: uppercase !important;
}

.primary-title {
    font-size: 28px !important;
    font-weight: 800 !important;
    color: #f9fafb !important;
    margin: 4px 0 2px 0 !important;
    letter-spacing: -0.01em !important;
}

.primary-category {
    font-size: 13px !important;
    color: #38bdf8 !important;
    font-weight: 600 !important;
}

.score-container {
    text-align: right !important;
}

.score-value {
    font-size: 36px !important;
    font-weight: 800 !important;
    color: #2dd4bf !important;
    line-height: 1 !important;
    letter-spacing: -0.02em !important;
}

.score-label {
    font-size: 11px !important;
    color: #9ca3af !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    margin-top: 4px !important;
}

.progress-track {
    width: 100% !important;
    height: 8px !important;
    background-color: #1f2937 !important;
    border-radius: 999px !important;
    overflow: hidden !important;
    margin: 18px 0 !important;
    border: 1px solid #374151 !important;
}

.progress-bar {
    height: 100% !important;
    border-radius: 999px !important;
    transition: width 0.3s ease !important;
}

.metadata-strip {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 20px !important;
    padding: 12px 16px !important;
    background: #1f2937 !important;
    border-radius: 8px !important;
    border: 1px solid #374151 !important;
    margin-bottom: 18px !important;
}

.meta-item {
    display: flex !important;
    flex-direction: column !important;
    gap: 3px !important;
}

.meta-label {
    font-size: 11px !important;
    color: #9ca3af !important;
    text-transform: uppercase !important;
    font-weight: 700 !important;
    letter-spacing: 0.04em !important;
}

.meta-val {
    font-size: 13px !important;
    color: #f9fafb !important;
    font-weight: 600 !important;
}

.urgency-badge {
    font-size: 11px !important;
    font-weight: 700 !important;
    padding: 3px 10px !important;
    border-radius: 4px !important;
    display: inline-block !important;
    width: fit-content !important;
}

.symptom-section {
    margin-top: 16px !important;
}

.symptom-title {
    font-size: 12px !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    color: #cbd5e1 !important;
    margin-bottom: 8px !important;
    letter-spacing: 0.05em !important;
}

.pill-group {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 8px !important;
}

.pill {
    font-size: 12px !important;
    padding: 4px 10px !important;
    border-radius: 6px !important;
    font-weight: 600 !important;
}

.pill-matched {
    background-color: rgba(16, 185, 129, 0.2) !important;
    color: #6ee7b7 !important;
    border: 1px solid rgba(16, 185, 129, 0.5) !important;
}

.pill-missing {
    background-color: rgba(148, 163, 184, 0.1) !important;
    color: #94a3b8 !important;
    border: 1px dashed rgba(148, 163, 184, 0.35) !important;
}

.pill-none {
    font-size: 12px !important;
    color: #64748b !important;
    font-style: italic !important;
}

.clinical-advisory-box {
    margin-top: 20px !important;
    background-color: rgba(13, 148, 136, 0.18) !important;
    border-left: 4px solid #2dd4bf !important;
    border-top: 1px solid rgba(45, 212, 191, 0.2) !important;
    border-right: 1px solid rgba(45, 212, 191, 0.2) !important;
    border-bottom: 1px solid rgba(45, 212, 191, 0.2) !important;
    padding: 14px 18px !important;
    border-radius: 0 8px 8px 0 !important;
}

.advisory-title {
    font-size: 12px !important;
    font-weight: 800 !important;
    text-transform: uppercase !important;
    color: #2dd4bf !important;
    letter-spacing: 0.06em !important;
    margin-bottom: 4px !important;
}

.advisory-content {
    font-size: 13.5px !important;
    color: #e2e8f0 !important;
    line-height: 1.55 !important;
}

/* Differential Panel */
.differential-panel {
    background: #111827 !important;
    border: 1px solid #1f2937 !important;
    border-radius: 10px !important;
    padding: 22px 24px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
}

.panel-header h3 {
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #f9fafb !important;
    margin: 0 0 4px 0 !important;
}

.panel-sub {
    font-size: 12px !important;
    color: #9ca3af !important;
}

.differential-list {
    margin-top: 14px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
}

.diff-row {
    display: flex !important;
    gap: 14px !important;
    padding: 14px 16px !important;
    border-radius: 8px !important;
    border: 1px solid #1f2937 !important;
    background: #1f2937 !important;
    transition: all 0.15s ease !important;
}

.diff-row:hover {
    border-color: #374151 !important;
    background: #253347 !important;
}

.lead-row {
    border-left: 4px solid #2dd4bf !important;
    background: #1a2538 !important;
}

.diff-rank {
    font-size: 14px !important;
    font-weight: 800 !important;
    color: #38bdf8 !important;
    min-width: 28px !important;
}

.diff-body {
    flex: 1 !important;
}

.diff-title-row {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
}

.diff-name {
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #f9fafb !important;
}

.diff-score {
    font-size: 15px !important;
    font-weight: 800 !important;
    color: #2dd4bf !important;
}

.diff-details {
    font-size: 12px !important;
    color: #9ca3af !important;
    margin-top: 2px !important;
}

.diff-symptoms {
    font-size: 12.5px !important;
    color: #cbd5e1 !important;
    margin-top: 6px !important;
    line-height: 1.4 !important;
}

.diff-symptoms strong {
    color: #38bdf8 !important;
}

.diff-advice {
    font-size: 12px !important;
    color: #94a3b8 !important;
    margin-top: 4px !important;
    line-height: 1.4 !important;
}

.diff-advice strong {
    color: #cbd5e1 !important;
}

/* Empty State Card */
.empty-state-card {
    background: #111827 !important;
    border: 1px dashed #374151 !important;
    border-radius: 10px !important;
    padding: 48px 32px !important;
    text-align: center !important;
}

.empty-icon {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 36px !important;
    height: 36px !important;
    border-radius: 50% !important;
    background: #1f2937 !important;
    color: #38bdf8 !important;
    font-weight: 700 !important;
    margin-bottom: 12px !important;
    font-family: serif !important;
    font-style: italic !important;
    border: 1px solid #374151 !important;
}

.empty-title {
    font-size: 16px !important;
    font-weight: 700 !important;
    color: #f9fafb !important;
}

.empty-desc {
    font-size: 13px !important;
    color: #9ca3af !important;
    max-width: 420px !important;
    margin: 6px auto 0 auto !important;
    line-height: 1.5 !important;
}

/* Knowledge Base Matrix Table */
.kb-table-container {
    overflow-x: auto !important;
    margin-top: 10px !important;
    border-radius: 8px !important;
    border: 1px solid #1f2937 !important;
}

.kb-table {
    width: 100% !important;
    border-collapse: collapse !important;
    font-size: 12.5px !important;
}

.kb-table th {
    background: #1f2937 !important;
    padding: 10px 12px !important;
    text-align: left !important;
    font-weight: 700 !important;
    color: #f9fafb !important;
    border-bottom: 1px solid #374151 !important;
}

.kb-table td {
    padding: 10px 12px !important;
    border-bottom: 1px solid #1f2937 !important;
    vertical-align: top !important;
    background: #111827 !important;
    color: #cbd5e1 !important;
}

.kb-rule-code {
    font-family: ui-monospace, Menlo, Consolas, monospace !important;
    font-size: 11.5px !important;
    background: #0b0f17 !important;
    padding: 2px 6px !important;
    border-radius: 4px !important;
    border: 1px solid #374151 !important;
    color: #38bdf8 !important;
}

.footer-disclaimer {
    margin-top: 28px !important;
    padding: 16px 20px !important;
    background-color: rgba(234, 179, 8, 0.08) !important;
    border: 1px solid rgba(234, 179, 8, 0.3) !important;
    border-radius: 8px !important;
    font-size: 12px !important;
    color: #fde047 !important;
    line-height: 1.5 !important;
}
"""



# ==============================================================================
# 5. GRADIO APPLICATION LAYOUT
# ==============================================================================
def create_app():
    # Build a clean knowledge base table for the inspector tab
    kb_rows = []
    for d_name, d_val in KNOWLEDGE_BASE.items():
        rules_repr = ", ".join([f"{k} (wt: {v})" for k, v in d_val["symptoms"].items()])
        kb_rows.append(f"""
        <tr>
            <td style="font-weight: 700; color: #f9fafb;">{d_name}</td>
            <td style="color: #2dd4bf; font-weight: 600;">{d_val.get('category', '-')}</td>
            <td><span class="kb-rule-code">{rules_repr}</span></td>
            <td style="color: #cbd5e1; font-size: 12px; line-height: 1.4;">{d_val['advice']}</td>
        </tr>
        """)
    kb_table_html = f"""
    <div class="kb-table-container">
        <table class="kb-table">
            <thead>
                <tr>
                    <th style="width: 160px;">Disease Rule</th>
                    <th style="width: 170px;">Classification</th>
                    <th>Production Rule Antecedents (Weights)</th>
                    <th style="width: 280px;">Clinical Action Protocol</th>
                </tr>
            </thead>
            <tbody>
                {"".join(kb_rows)}
            </tbody>
        </table>
    </div>
    """

    with gr.Blocks(title="Clinical Diagnostic Expert System") as demo:
        # Clinical Header & Injected Stylesheet
        gr.HTML(f"""
        <style>
        {CUSTOM_CSS}
        </style>
        <div class="app-header">
            <div class="header-top">
                <span class="institution-tag">Rule-Based Inference Engine &bull; KBS-3</span>
                <span style="font-size: 12px; color: #9ca3af; font-weight: 500;">Forward-Chaining Production System</span>
            </div>
            <h1 class="system-title">Clinical Diagnostic Expert System</h1>
            <p class="system-subtitle">
                A deterministic, rule-based clinical decision support utility for preliminary differential diagnosis.
                Evaluates patient-reported manifestations against structured symptom-weight production rules.
            </p>
        </div>
        """)

        with gr.Row():
            # LEFT COLUMN: Clinical Intake
            with gr.Column(scale=4):
                gr.Markdown("### 1. Case Presets & Intake")

                preset_dropdown = gr.Dropdown(
                    choices=list(CLINICAL_PRESETS.keys()),
                    value="Select Case Preset...",
                    label="Load Clinical Preset Case (Quick Assessment)",
                    info="Populates typical patient manifestations for viva examination & clinical evaluation.",
                )

                gr.Markdown("---")
                gr.Markdown("### 2. Manifestation Checklist")

                all_symptom_choices = [
                    label for group in SYMPTOM_GROUPS.values() for _, label in group
                ]

                # Categorized Checkbox Groups
                group_checkboxes = {}
                for g_name, items in SYMPTOM_GROUPS.items():
                    with gr.Accordion(g_name, open=True):
                        choices = [lbl for _, lbl in items]
                        group_checkboxes[g_name] = gr.CheckboxGroup(
                            choices=choices,
                            value=[],
                            label="",
                            show_label=False,
                        )

                with gr.Row():
                    evaluate_btn = gr.Button("Execute Inference Engine", variant="primary")
                    clear_btn = gr.Button("Reset Findings", variant="secondary")

            # RIGHT COLUMN: Diagnostic Results & Explainability
            with gr.Column(scale=6):
                with gr.Tabs():
                    with gr.TabItem("Diagnostic Assessment"):
                        primary_output = gr.HTML(
                            value="""
                            <div class="empty-state-card">
                                <div class="empty-icon">i</div>
                                <div class="empty-title">Awaiting Clinical Findings</div>
                                <div class="empty-desc">
                                    Select observed patient symptoms from the systemic categories on the left,
                                    or load a clinical case preset above to initiate forward-chaining inference.
                                </div>
                            </div>
                            """
                        )
                        diff_output = gr.HTML(value="")

                    with gr.TabItem("Inference Engine Trace (Audit)"):
                        gr.Markdown("#### Production Rule Activation Trace")
                        gr.Markdown(
                            "The transparent deduction trail generated by forward-chaining "
                            "over active knowledge base rules:"
                        )
                        trace_output = gr.Code(
                            value="No inference run executed yet.",
                            language="markdown",
                            label="Rule-by-Rule Reasoning Log",
                            lines=14,
                        )

                    with gr.TabItem("Knowledge Base Inspector"):
                        gr.Markdown("#### Knowledge Base Production Rules Matrix")
                        gr.Markdown(
                            "Formal mapping of diseases, symptom antecedent weights, and clinical advisory protocols:"
                        )
                        gr.HTML(value=kb_table_html)

        # Medical Ethics & Triage Disclaimer
        gr.HTML("""
        <div class="footer-disclaimer">
            <strong>CLINICAL DECISION SUPPORT DISCLAIMER:</strong> This rule-based expert system is designed exclusively
            for educational demonstration, academic viva evaluation, and preliminary symptom triage estimation.
            It uses deterministic forward-chaining over a curated 8-condition knowledge base and does NOT constitute
            a definitive medical diagnosis or replace consultation with a licensed medical professional. In the event of
            severe respiratory distress, high unremitting fever, neurological deficits, or hemorrhage, seek emergency medical care immediately.
        </div>
        """)

        # ----------------------------------------------------------------------
        # EVENT WIRING & INTERACTION LOGIC
        # ----------------------------------------------------------------------
        all_cb_components = list(group_checkboxes.values())

        def gather_all_selected(*selected_groups):
            merged = []
            for group in selected_groups:
                if group:
                    merged.extend(group)
            return merged

        def run_diagnosis(*selected_groups):
            merged = gather_all_selected(*selected_groups)
            return render_diagnostic_assessment(merged)

        # Trigger inference on button click
        evaluate_btn.click(
            fn=run_diagnosis,
            inputs=all_cb_components,
            outputs=[primary_output, diff_output, trace_output],
        )

        # Real-time reactive updates as checkboxes toggle
        for cb in all_cb_components:
            cb.change(
                fn=run_diagnosis,
                inputs=all_cb_components,
                outputs=[primary_output, diff_output, trace_output],
            )

        # Preset selection handler
        def apply_preset(preset_name):
            if not preset_name or preset_name == "Select Case Preset...":
                # Clear all
                res = [[] for _ in all_cb_components]
                prim, diff, trace = render_diagnostic_assessment([])
                return res + [prim, diff, trace]

            selected_labels = set(load_preset_case(preset_name))
            updated_checkbox_values = []
            for g_name, items in SYMPTOM_GROUPS.items():
                group_selected = [lbl for _, lbl in items if lbl in selected_labels]
                updated_checkbox_values.append(group_selected)

            prim, diff, trace = render_diagnostic_assessment(list(selected_labels))
            return updated_checkbox_values + [prim, diff, trace]

        preset_dropdown.change(
            fn=apply_preset,
            inputs=[preset_dropdown],
            outputs=all_cb_components + [primary_output, diff_output, trace_output],
        )

        # Reset button handler
        def reset_all():
            res = [[] for _ in all_cb_components]
            prim, diff, trace = render_diagnostic_assessment([])
            return ["Select Case Preset..."] + res + [prim, diff, trace]

        clear_btn.click(
            fn=reset_all,
            inputs=[],
            outputs=[preset_dropdown] + all_cb_components + [primary_output, diff_output, trace_output],
        )

    return demo


if __name__ == "__main__":
    app = create_app()
    app.launch(server_name="127.0.0.1", server_port=7860, inbrowser=True, share=False)
