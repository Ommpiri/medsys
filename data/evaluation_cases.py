"""
Evaluation Dataset for MedExpert Clinical Decision Support System.
Independent benchmark cases reflecting clinical case presentations across diverse categories.
"""

import json

EVALUATION_BENCHMARK = [
  {
    "id": "CASE-01",
    "name": "Classic Influenza Presentation",
    "expected_top": "Influenza (Flu)",
    "expected_differentials": ["Pneumonia", "COVID-19", "Common Cold"],
    "symptoms": ["fever", "cough", "fatigue", "muscle_pain", "headache", "chills"],
    "clinical_answers": {"feverSeverity": "high", "duration": "1-3d"},
    "has_red_flags": False
  },
  {
    "id": "CASE-02",
    "name": "Acute Upper Respiratory Infection (Common Cold)",
    "expected_top": "Common Cold",
    "expected_differentials": ["Allergic Rhinitis (Hay Fever)", "Sinusitis (Sinus Infection)"],
    "symptoms": ["runny_nose", "sneezing", "sore_throat", "mild_fever", "stuffy_nose"],
    "clinical_answers": {"feverSeverity": "mild", "duration": "3-7d"},
    "has_red_flags": False
  },
  {
    "id": "CASE-03",
    "name": "Classic COVID-19 with Anosmia",
    "expected_top": "COVID-19",
    "expected_differentials": ["Influenza (Flu)", "Pneumonia"],
    "symptoms": ["loss_of_taste_smell", "fever", "cough", "fatigue"],
    "clinical_answers": {"feverSeverity": "moderate", "duration": "3-7d"},
    "has_red_flags": False
  },
  {
    "id": "CASE-04",
    "name": "Lower Respiratory Infection (Bacterial Pneumonia)",
    "expected_top": "Pneumonia",
    "expected_differentials": ["Influenza (Flu)", "COVID-19", "Acute Bronchitis (Chest Cold)"],
    "symptoms": ["fever", "productive_cough", "shortness_of_breath", "chest_pain", "high_fever"],
    "clinical_answers": {"feverSeverity": "high", "coughType": "productive", "duration": "3-7d"},
    "has_red_flags": False
  },
  {
    "id": "CASE-05",
    "name": "Reactive Airway Bronchospasm (Asthma Attack)",
    "expected_top": "Asthma",
    "expected_differentials": ["Chronic Obstructive Pulmonary Disease (COPD)", "Acute Bronchitis (Chest Cold)"],
    "symptoms": ["wheezing", "shortness_of_breath", "chest_tightness", "cough"],
    "clinical_answers": {"feverSeverity": "none", "coughType": "dry", "duration": "<1d"},
    "has_red_flags": False
  },
  {
    "id": "CASE-06",
    "name": "Unilateral Pulsating Cephalea (Migraine)",
    "expected_top": "Migraine",
    "expected_differentials": ["Tension-Type Headache"],
    "symptoms": ["one_sided_headache", "nausea", "light_sensitivity", "sound_sensitivity", "visual_aura"],
    "clinical_answers": {"duration": "<1d"},
    "patient_info": {"gender": "Female", "age": 28},
    "has_red_flags": False
  },
  {
    "id": "CASE-07",
    "name": "Acute Upper Gastrointestinal Distress (Gastritis)",
    "expected_top": "Gastritis",
    "expected_differentials": ["Gastroesophageal Reflux Disease (GERD)", "Viral Gastroenteritis (Stomach Flu)"],
    "symptoms": ["upper_abdominal_pain", "nausea", "indigestion", "bloating", "loss_of_appetite"],
    "clinical_answers": {"duration": "1-3d"},
    "has_red_flags": False
  },
  {
    "id": "CASE-08",
    "name": "Acute Viral Enteritis (Gastroenteritis)",
    "expected_top": "Viral Gastroenteritis (Stomach Flu)",
    "expected_differentials": ["Food Poisoning (Foodborne Illness)", "Gastritis"],
    "symptoms": ["diarrhea", "vomiting", "abdominal_cramps", "nausea", "mild_fever"],
    "clinical_answers": {"feverSeverity": "mild", "duration": "1-3d"},
    "has_red_flags": False
  },
  {
    "id": "CASE-09",
    "name": "Severe Arboviral Syndrome (Dengue Fever)",
    "expected_top": "Dengue Fever",
    "expected_differentials": ["Malaria", "Typhoid Fever", "Influenza (Flu)"],
    "symptoms": ["high_fever", "severe_headache", "eye_pain_behind", "joint_pain", "muscle_pain", "rash"],
    "clinical_answers": {"feverSeverity": "high", "duration": "3-7d"},
    "has_red_flags": False
  },
  {
    "id": "CASE-10",
    "name": "Acute Uncomplicated Cystitis (UTI)",
    "expected_top": "Urinary Tract Infection (UTI)",
    "expected_differentials": ["Kidney Stones"],
    "symptoms": ["painful_urination", "frequent_urination", "urgent_urination", "pelvic_pain", "cloudy_urine"],
    "patient_info": {"gender": "Female", "age": 30},
    "clinical_answers": {"duration": "1-3d"},
    "has_red_flags": False
  },
  {
    "id": "CASE-11",
    "name": "Acute Stroke Red Flag Emergency",
    "expected_top": None,
    "symptoms": ["face_drooping", "speech_difficulty", "arm_leg_weakness"],
    "has_red_flags": True,
    "expected_red_flag_id": "RF-01"
  },
  {
    "id": "CASE-12",
    "name": "Acute Cardiac / Myocardial Infarction Red Flag",
    "expected_top": None,
    "symptoms": ["chest_pain_radiating", "cold_sweat", "shortness_of_breath"],
    "has_red_flags": True,
    "expected_red_flag_id": "RF-02"
  },
  {
    "id": "CASE-13",
    "name": "Acute Appendicitis Surgical Red Flag",
    "expected_top": "Appendicitis",
    "symptoms": ["right_lower_abdominal_pain", "severe_abdominal_pain", "fever", "nausea", "vomiting"],
    "has_red_flags": True,
    "expected_red_flag_id": "RF-07"
  },
  {
    "id": "CASE-14",
    "name": "Acute Severe Dyspnea Red Flag",
    "expected_top": "Pneumonia",
    "symptoms": ["severe_breathing_difficulty", "bluish_lips", "productive_cough", "fever"],
    "has_red_flags": True,
    "expected_red_flag_id": "RF-03"
  },
  {
    "id": "CASE-15",
    "name": "Meningitis Red Flag Triage",
    "expected_top": None,
    "symptoms": ["stiff_neck", "high_fever", "confusion"],
    "has_red_flags": True,
    "expected_red_flag_id": "RF-04"
  }
]

if __name__ == "__main__":
    with open("data/evaluation_cases.json", "w", encoding="utf-8") as f:
        json.dump(EVALUATION_BENCHMARK, f, indent=2)
    print(f"Exported {len(EVALUATION_BENCHMARK)} evaluation benchmark cases to data/evaluation_cases.json")
