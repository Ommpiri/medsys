/**
 * MedExpert Normalized Knowledge Base Bundle (v2.0.0)
 * Authoritative WHO ICD-11 & NLM Clinical Tables enriched clinical dataset.
 */

window.MEDEXPERT_VERSION = '2.0.0';
window.SYMPTOMS_DATA = [
  {
    "id": "fever",
    "label": "Fever",
    "category": "General",
    "aliases": [
      "high temperature",
      "temperature",
      "feverish",
      "pyrexia",
      "running a temperature",
      "hot body",
      "febrile"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/fever.html"
  },
  {
    "id": "high_fever",
    "label": "High fever (above 39\u00b0C / 102\u00b0F)",
    "category": "General",
    "aliases": [
      "very high temperature",
      "burning up",
      "high grade fever"
    ],
    "parent": "fever",
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/fever.html"
  },
  {
    "id": "mild_fever",
    "label": "Mild fever (37.5\u201338\u00b0C)",
    "category": "General",
    "aliases": [
      "low-grade fever",
      "slight temperature",
      "low fever"
    ],
    "parent": "fever",
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/fever.html"
  },
  {
    "id": "chills",
    "label": "Chills / shivering",
    "category": "General",
    "aliases": [
      "shivering",
      "rigors",
      "feeling cold",
      "shaking chills",
      "shivers"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "fatigue",
    "label": "Fatigue / tiredness",
    "category": "General",
    "aliases": [
      "tiredness",
      "weakness",
      "exhaustion",
      "low energy",
      "lethargy",
      "tired all the time",
      "feeling weak"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/fatigue.html"
  },
  {
    "id": "loss_of_appetite",
    "label": "Loss of appetite",
    "category": "General",
    "aliases": [
      "not hungry",
      "poor appetite",
      "anorexia",
      "no appetite"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "sweating",
    "label": "Sweating",
    "category": "General",
    "aliases": [
      "sweats",
      "perspiration",
      "sweaty"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "night_sweats",
    "label": "Night sweats",
    "category": "General",
    "aliases": [
      "sweating at night",
      "drenching sweats"
    ],
    "parent": "sweating",
    "source": null,
    "source_url": null
  },
  {
    "id": "weight_loss",
    "label": "Unintentional weight loss",
    "category": "General",
    "aliases": [
      "losing weight",
      "weight loss",
      "getting thinner"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "weight_gain",
    "label": "Unexplained weight gain",
    "category": "General",
    "aliases": [
      "gaining weight",
      "weight gain"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "excessive_thirst",
    "label": "Excessive thirst",
    "category": "General",
    "aliases": [
      "always thirsty",
      "polydipsia",
      "very thirsty"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "dehydration_signs",
    "label": "Signs of dehydration (dry mouth, dark or little urine)",
    "category": "General",
    "aliases": [
      "dry mouth",
      "dehydrated",
      "dehydration"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/dehydration.html"
  },
  {
    "id": "cold_intolerance",
    "label": "Feeling cold easily",
    "category": "General",
    "aliases": [
      "cold intolerance",
      "always cold",
      "cold hands and feet",
      "sensitive to cold"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "cough",
    "label": "Cough",
    "category": "Respiratory",
    "aliases": [
      "coughing",
      "tussis"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/cough.html"
  },
  {
    "id": "dry_cough",
    "label": "Dry cough",
    "category": "Respiratory",
    "aliases": [
      "tickly cough",
      "non-productive cough",
      "hacking cough"
    ],
    "parent": "cough",
    "source": null,
    "source_url": null
  },
  {
    "id": "productive_cough",
    "label": "Cough with phlegm / mucus",
    "category": "Respiratory",
    "aliases": [
      "wet cough",
      "chesty cough",
      "coughing up mucus",
      "sputum",
      "phlegm",
      "productive cough"
    ],
    "parent": "cough",
    "source": null,
    "source_url": null
  },
  {
    "id": "coughing_blood",
    "label": "Coughing up blood",
    "category": "Respiratory",
    "aliases": [
      "hemoptysis",
      "blood in sputum",
      "bloody phlegm",
      "spitting blood"
    ],
    "parent": "cough",
    "source": null,
    "source_url": null
  },
  {
    "id": "shortness_of_breath",
    "label": "Shortness of breath",
    "category": "Respiratory",
    "aliases": [
      "breathlessness",
      "difficulty breathing",
      "can't catch my breath",
      "dyspnea",
      "out of breath",
      "short of breath",
      "breathing difficulty"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/breathingproblems.html"
  },
  {
    "id": "severe_breathing_difficulty",
    "label": "Severe difficulty breathing (struggling to speak)",
    "category": "Respiratory",
    "aliases": [
      "gasping",
      "struggling to breathe",
      "can't breathe",
      "trouble breathing"
    ],
    "parent": "shortness_of_breath",
    "source": null,
    "source_url": null
  },
  {
    "id": "rapid_breathing",
    "label": "Rapid breathing",
    "category": "Respiratory",
    "aliases": [
      "fast breathing",
      "tachypnea",
      "breathing fast"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "wheezing",
    "label": "Wheezing",
    "category": "Respiratory",
    "aliases": [
      "whistling breath",
      "wheeze",
      "whistling sound when breathing"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "chest_tightness",
    "label": "Chest tightness",
    "category": "Respiratory",
    "aliases": [
      "tight chest",
      "chest pressure when breathing"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "bluish_lips",
    "label": "Bluish lips or face",
    "category": "Respiratory",
    "aliases": [
      "blue lips",
      "cyanosis",
      "grey lips",
      "bluish skin"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "sore_throat",
    "label": "Sore throat",
    "category": "ENT",
    "aliases": [
      "throat pain",
      "scratchy throat",
      "pharyngitis",
      "painful throat",
      "throat ache"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/sorethroat.html"
  },
  {
    "id": "painful_swallowing",
    "label": "Pain when swallowing",
    "category": "ENT",
    "aliases": [
      "odynophagia",
      "hurts to swallow",
      "painful swallowing",
      "difficulty swallowing"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "swollen_tonsils",
    "label": "Red or swollen tonsils (may have white patches)",
    "category": "ENT",
    "aliases": [
      "white patches on tonsils",
      "tonsillitis",
      "pus on tonsils",
      "swollen tonsils"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "runny_nose",
    "label": "Runny nose",
    "category": "ENT",
    "aliases": [
      "nasal discharge",
      "rhinorrhea",
      "drippy nose",
      "running nose"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "stuffy_nose",
    "label": "Stuffy / blocked nose",
    "category": "ENT",
    "aliases": [
      "nasal congestion",
      "blocked nose",
      "congestion",
      "stuffy nose",
      "congested"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "sneezing",
    "label": "Sneezing",
    "category": "ENT",
    "aliases": [
      "sneeze",
      "sneezes"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "postnasal_drip",
    "label": "Postnasal drip",
    "category": "ENT",
    "aliases": [
      "mucus dripping down throat",
      "post-nasal drip",
      "drainage down the throat"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "itchy_nose_throat",
    "label": "Itchy nose, throat or roof of mouth",
    "category": "ENT",
    "aliases": [
      "itchy nose",
      "itchy throat",
      "itchy palate"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "facial_pain",
    "label": "Facial pain or pressure (cheeks, forehead, around eyes)",
    "category": "ENT",
    "aliases": [
      "sinus pressure",
      "sinus pain",
      "face pain",
      "pressure in face"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "loss_of_taste_smell",
    "label": "New loss of taste or smell",
    "category": "ENT",
    "aliases": [
      "anosmia",
      "can't smell",
      "can't taste",
      "loss of smell",
      "loss of taste",
      "no taste"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "ear_pain",
    "label": "Ear pain",
    "category": "ENT",
    "aliases": [
      "earache",
      "ear ache",
      "otalgia",
      "pain in ear"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/earinfections.html"
  },
  {
    "id": "ear_discharge",
    "label": "Fluid draining from the ear",
    "category": "ENT",
    "aliases": [
      "ear discharge",
      "pus from ear",
      "ear drainage"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "hearing_loss",
    "label": "Muffled hearing / trouble hearing",
    "category": "ENT",
    "aliases": [
      "muffled hearing",
      "hearing loss",
      "can't hear well",
      "blocked ear"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "hoarse_voice",
    "label": "Hoarse voice",
    "category": "ENT",
    "aliases": [
      "hoarseness",
      "lost voice",
      "raspy voice"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "koplik_spots",
    "label": "Tiny white spots inside the mouth",
    "category": "ENT",
    "aliases": [
      "koplik spots",
      "white spots in mouth",
      "white spots inside cheeks"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "red_eyes",
    "label": "Red / pink eyes",
    "category": "Ophthalmic",
    "aliases": [
      "pink eye",
      "bloodshot eyes",
      "red eye",
      "eye redness"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "itchy_eyes",
    "label": "Itchy eyes",
    "category": "Ophthalmic",
    "aliases": [
      "eye itching",
      "itching eyes"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "watery_eyes",
    "label": "Watery eyes",
    "category": "Ophthalmic",
    "aliases": [
      "teary eyes",
      "tearing",
      "eyes watering"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "eye_discharge",
    "label": "Eye discharge / crusty eyelids",
    "category": "Ophthalmic",
    "aliases": [
      "sticky eyes",
      "crusty eyelids",
      "pus in eye",
      "eye gunk"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "light_sensitivity",
    "label": "Sensitivity to light",
    "category": "Ophthalmic",
    "aliases": [
      "photophobia",
      "light hurts eyes",
      "bright light bothers me"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "blurred_vision",
    "label": "Blurred vision",
    "category": "Ophthalmic",
    "aliases": [
      "blurry vision",
      "vision blurry",
      "fuzzy vision"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "eye_pain_behind",
    "label": "Pain behind the eyes",
    "category": "Ophthalmic",
    "aliases": [
      "retro-orbital pain",
      "eye pain",
      "pain behind eyes"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "vision_loss_sudden",
    "label": "Sudden vision loss or double vision",
    "category": "Ophthalmic",
    "aliases": [
      "double vision",
      "sudden blindness",
      "can't see",
      "trouble seeing in one or both eyes"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "headache",
    "label": "Headache",
    "category": "Neurological",
    "aliases": [
      "head pain",
      "head ache",
      "my head hurts",
      "cephalalgia",
      "head hurting"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/headache.html"
  },
  {
    "id": "severe_headache",
    "label": "Severe headache",
    "category": "Neurological",
    "aliases": [
      "bad headache",
      "pounding headache",
      "intense headache"
    ],
    "parent": "headache",
    "source": null,
    "source_url": null
  },
  {
    "id": "thunderclap_headache",
    "label": "Sudden, severe 'worst-ever' headache",
    "category": "Neurological",
    "aliases": [
      "worst headache of my life",
      "sudden severe headache",
      "thunderclap headache"
    ],
    "parent": "headache",
    "source": null,
    "source_url": null
  },
  {
    "id": "one_sided_headache",
    "label": "Throbbing headache on one side",
    "category": "Neurological",
    "aliases": [
      "one-sided headache",
      "unilateral headache",
      "pulsating headache",
      "throbbing head"
    ],
    "parent": "headache",
    "source": null,
    "source_url": null
  },
  {
    "id": "head_pressure",
    "label": "Head pressure / tight band around the head",
    "category": "Neurological",
    "aliases": [
      "tight band around head",
      "pressure in head",
      "head tightness",
      "squeezing head"
    ],
    "parent": "headache",
    "source": null,
    "source_url": null
  },
  {
    "id": "visual_aura",
    "label": "Visual disturbances before headache (aura)",
    "category": "Neurological",
    "aliases": [
      "aura",
      "zigzag lines",
      "flashing lights",
      "seeing spots"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "dizziness",
    "label": "Dizziness",
    "category": "Neurological",
    "aliases": [
      "dizzy",
      "off balance",
      "unsteady",
      "head spinning"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/dizzinessandvertigo.html"
  },
  {
    "id": "lightheadedness",
    "label": "Lightheadedness",
    "category": "Neurological",
    "aliases": [
      "light-headed",
      "light headed",
      "feeling faint",
      "woozy",
      "about to pass out"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/dizzinessandvertigo.html"
  },
  {
    "id": "vertigo",
    "label": "Spinning sensation (vertigo)",
    "category": "Neurological",
    "aliases": [
      "room spinning",
      "vertigo",
      "spinning head"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/dizzinessandvertigo.html"
  },
  {
    "id": "confusion",
    "label": "New confusion",
    "category": "Neurological",
    "aliases": [
      "disoriented",
      "not thinking clearly",
      "altered mental state",
      "confused"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "fainting",
    "label": "Fainting / passing out",
    "category": "Neurological",
    "aliases": [
      "passed out",
      "blackout",
      "syncope",
      "loss of consciousness",
      "fainted"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "seizure",
    "label": "Seizure",
    "category": "Neurological",
    "aliases": [
      "fit",
      "convulsion",
      "convulsions"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/seizures.html"
  },
  {
    "id": "stiff_neck",
    "label": "Stiff neck",
    "category": "Neurological",
    "aliases": [
      "neck stiffness",
      "can't bend neck",
      "rigid neck"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "face_drooping",
    "label": "Face drooping on one side",
    "category": "Neurological",
    "aliases": [
      "facial droop",
      "uneven smile",
      "drooping face"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "arm_leg_weakness",
    "label": "Sudden weakness or numbness on one side of the body",
    "category": "Neurological",
    "aliases": [
      "one-sided weakness",
      "arm weakness",
      "numb arm",
      "hemiparesis",
      "leg weakness"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "speech_difficulty",
    "label": "Slurred or difficult speech",
    "category": "Neurological",
    "aliases": [
      "slurred speech",
      "trouble speaking",
      "can't talk properly"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "sound_sensitivity",
    "label": "Sensitivity to sound",
    "category": "Neurological",
    "aliases": [
      "phonophobia",
      "noise sensitivity",
      "noise bothers me"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "numbness_tingling",
    "label": "Numbness or tingling in hands or feet",
    "category": "Neurological",
    "aliases": [
      "pins and needles",
      "tingling",
      "numb feet",
      "numb hands"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "chest_pain",
    "label": "Chest pain / discomfort",
    "category": "Cardiovascular",
    "aliases": [
      "chest discomfort",
      "pain in chest",
      "angina",
      "chest ache"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/chestpain.html"
  },
  {
    "id": "chest_pain_radiating",
    "label": "Chest pain spreading to arm, jaw, neck or back",
    "category": "Cardiovascular",
    "aliases": [
      "pain in left arm",
      "jaw pain with chest pain",
      "radiating chest pain"
    ],
    "parent": "chest_pain",
    "source": null,
    "source_url": null
  },
  {
    "id": "palpitations",
    "label": "Palpitations",
    "category": "Cardiovascular",
    "aliases": [
      "racing heart",
      "heart pounding",
      "fluttering heartbeat",
      "rapid heartbeat",
      "fast heartbeat"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/heartdiseases.html"
  },
  {
    "id": "leg_swelling",
    "label": "Swelling in legs or ankles",
    "category": "Cardiovascular",
    "aliases": [
      "swollen ankles",
      "edema",
      "swollen legs",
      "puffy feet"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "cold_sweat",
    "label": "Breaking out in a cold sweat",
    "category": "Cardiovascular",
    "aliases": [
      "clammy skin",
      "cold sweat",
      "clammy"
    ],
    "parent": "sweating",
    "source": null,
    "source_url": null
  },
  {
    "id": "nausea",
    "label": "Nausea",
    "category": "Gastrointestinal",
    "aliases": [
      "feeling sick",
      "queasy",
      "sick to my stomach",
      "upset stomach"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/nauseaandvomiting.html"
  },
  {
    "id": "vomiting",
    "label": "Vomiting",
    "category": "Gastrointestinal",
    "aliases": [
      "throwing up",
      "being sick",
      "emesis",
      "puking",
      "vomit"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/nauseaandvomiting.html"
  },
  {
    "id": "persistent_vomiting",
    "label": "Persistent vomiting (can't keep fluids down)",
    "category": "Gastrointestinal",
    "aliases": [
      "can't keep fluids down",
      "repeated vomiting",
      "non-stop vomiting"
    ],
    "parent": "vomiting",
    "source": null,
    "source_url": null
  },
  {
    "id": "diarrhea",
    "label": "Diarrhea",
    "category": "Gastrointestinal",
    "aliases": [
      "loose stools",
      "watery stools",
      "the runs",
      "loose motions",
      "diarrhoea"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/diarrhea.html"
  },
  {
    "id": "constipation",
    "label": "Constipation",
    "category": "Gastrointestinal",
    "aliases": [
      "hard stools",
      "can't poop",
      "infrequent bowel movements",
      "straining"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/constipation.html"
  },
  {
    "id": "stomach_pain",
    "label": "Stomach / abdominal pain",
    "category": "Gastrointestinal",
    "aliases": [
      "tummy ache",
      "belly pain",
      "stomach ache",
      "abdominal pain",
      "stomachache"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/abdominalpain.html"
  },
  {
    "id": "abdominal_cramps",
    "label": "Abdominal cramps",
    "category": "Gastrointestinal",
    "aliases": [
      "stomach cramps",
      "cramping",
      "belly cramps"
    ],
    "parent": "stomach_pain",
    "source": null,
    "source_url": null
  },
  {
    "id": "upper_abdominal_pain",
    "label": "Upper-middle abdominal (epigastric) pain",
    "category": "Gastrointestinal",
    "aliases": [
      "pain in upper stomach",
      "burning stomach pain",
      "epigastric pain"
    ],
    "parent": "stomach_pain",
    "source": null,
    "source_url": null
  },
  {
    "id": "right_lower_abdominal_pain",
    "label": "Pain in the lower right abdomen",
    "category": "Gastrointestinal",
    "aliases": [
      "right-sided belly pain",
      "pain near belly button moving to the right",
      "lower right stomach pain"
    ],
    "parent": "stomach_pain",
    "source": null,
    "source_url": null
  },
  {
    "id": "severe_abdominal_pain",
    "label": "Severe or worsening abdominal pain",
    "category": "Gastrointestinal",
    "aliases": [
      "intense stomach pain",
      "excruciating belly pain",
      "worst stomach pain"
    ],
    "parent": "stomach_pain",
    "source": null,
    "source_url": null
  },
  {
    "id": "bloating",
    "label": "Bloating",
    "category": "Gastrointestinal",
    "aliases": [
      "gassy",
      "swollen belly",
      "abdominal distension",
      "gas"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/gas.html"
  },
  {
    "id": "heartburn",
    "label": "Heartburn",
    "category": "Gastrointestinal",
    "aliases": [
      "acid reflux",
      "burning in chest after eating",
      "acidity"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/heartburn.html"
  },
  {
    "id": "regurgitation",
    "label": "Sour taste / food coming back up",
    "category": "Gastrointestinal",
    "aliases": [
      "acid regurgitation",
      "sour taste in mouth",
      "food coming up"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "indigestion",
    "label": "Indigestion / feeling full quickly",
    "category": "Gastrointestinal",
    "aliases": [
      "dyspepsia",
      "fullness after eating",
      "upset stomach after meals"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/indigestion.html"
  },
  {
    "id": "vomiting_blood",
    "label": "Vomiting blood",
    "category": "Gastrointestinal",
    "aliases": [
      "hematemesis",
      "coffee-ground vomit",
      "blood in vomit"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "black_stools",
    "label": "Black, tarry or bloody stools",
    "category": "Gastrointestinal",
    "aliases": [
      "tarry stools",
      "blood in stool",
      "rectal bleeding",
      "bloody stool"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "jaundice",
    "label": "Yellow skin or eyes (jaundice)",
    "category": "Gastrointestinal",
    "aliases": [
      "jaundice",
      "yellowing eyes",
      "yellow skin"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "clay_colored_stools",
    "label": "Pale or clay-colored stools",
    "category": "Gastrointestinal",
    "aliases": [
      "pale stools",
      "light colored stool",
      "grey stool"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "body_pain",
    "label": "Body aches",
    "category": "Musculoskeletal",
    "aliases": [
      "aching all over",
      "generalized body pain",
      "body ache",
      "achy"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "muscle_pain",
    "label": "Muscle pain",
    "category": "Musculoskeletal",
    "aliases": [
      "myalgia",
      "sore muscles",
      "muscle aches",
      "muscle ache"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "joint_pain",
    "label": "Joint pain",
    "category": "Musculoskeletal",
    "aliases": [
      "arthralgia",
      "aching joints",
      "painful joints"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "back_pain",
    "label": "Back pain",
    "category": "Musculoskeletal",
    "aliases": [
      "lower back pain",
      "backache"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/backpain.html"
  },
  {
    "id": "muscle_tension",
    "label": "Muscle tension (neck, shoulders)",
    "category": "Musculoskeletal",
    "aliases": [
      "tense muscles",
      "tight shoulders",
      "neck tension"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "rash",
    "label": "Skin rash",
    "category": "Dermatological",
    "aliases": [
      "spots",
      "red spots",
      "skin eruption",
      "red rash"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/rashes.html"
  },
  {
    "id": "itchy_rash",
    "label": "Itchy, blister-like rash",
    "category": "Dermatological",
    "aliases": [
      "fluid-filled blisters",
      "itchy spots",
      "blisters",
      "itchy blisters"
    ],
    "parent": "rash",
    "source": null,
    "source_url": null
  },
  {
    "id": "itchy_skin",
    "label": "Itchy skin",
    "category": "Dermatological",
    "aliases": [
      "pruritus",
      "itching",
      "skin itching"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/itching.html"
  },
  {
    "id": "dry_skin",
    "label": "Dry skin",
    "category": "Dermatological",
    "aliases": [
      "flaky skin",
      "rough skin"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "pale_skin",
    "label": "Pale skin",
    "category": "Dermatological",
    "aliases": [
      "pallor",
      "looking pale",
      "pale"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "thinning_hair",
    "label": "Thinning hair",
    "category": "Dermatological",
    "aliases": [
      "hair loss",
      "hair falling out",
      "dry hair"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "slow_healing_sores",
    "label": "Slow-healing sores or cuts",
    "category": "Dermatological",
    "aliases": [
      "wounds not healing",
      "slow healing"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "painful_urination",
    "label": "Painful or burning urination",
    "category": "Genitourinary",
    "aliases": [
      "burning when peeing",
      "dysuria",
      "stinging urine",
      "pain when urinating"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "frequent_urination",
    "label": "Frequent urination",
    "category": "Genitourinary",
    "aliases": [
      "peeing a lot",
      "need to pee often",
      "polyuria",
      "urinating often"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "urgent_urination",
    "label": "Strong urge to urinate",
    "category": "Genitourinary",
    "aliases": [
      "urgency",
      "sudden need to pee",
      "urinary urgency"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "cloudy_urine",
    "label": "Cloudy or strong-smelling urine",
    "category": "Genitourinary",
    "aliases": [
      "smelly urine",
      "foul-smelling urine",
      "cloudy pee"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "blood_in_urine",
    "label": "Blood in urine",
    "category": "Genitourinary",
    "aliases": [
      "hematuria",
      "pink urine",
      "red urine"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "pelvic_pain",
    "label": "Lower abdominal / pelvic pain or pressure",
    "category": "Genitourinary",
    "aliases": [
      "pelvic pressure",
      "bladder pain",
      "pain above pubic bone"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "flank_pain",
    "label": "Pain in the side or back below the ribs",
    "category": "Genitourinary",
    "aliases": [
      "flank pain",
      "kidney pain",
      "side pain"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "dark_urine",
    "label": "Dark urine",
    "category": "Genitourinary",
    "aliases": [
      "tea-colored urine",
      "brown urine"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "reduced_urination",
    "label": "Little or no urination",
    "category": "Genitourinary",
    "aliases": [
      "not peeing",
      "no urine",
      "peeing very little"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "anxiety_worry",
    "label": "Excessive worry or anxiety",
    "category": "Mental/behavioral",
    "aliases": [
      "feeling anxious",
      "nervousness",
      "constant worry",
      "anxiety",
      "anxious"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/anxiety.html"
  },
  {
    "id": "restlessness",
    "label": "Restlessness / feeling on edge",
    "category": "Mental/behavioral",
    "aliases": [
      "on edge",
      "keyed up",
      "can't sit still",
      "restless"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "irritability",
    "label": "Irritability",
    "category": "Mental/behavioral",
    "aliases": [
      "irritable",
      "easily annoyed",
      "fussy (child)",
      "short-tempered"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "sleep_problems",
    "label": "Sleep problems",
    "category": "Mental/behavioral",
    "aliases": [
      "insomnia",
      "trouble sleeping",
      "can't sleep",
      "oversleeping"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/sleepdisorders.html"
  },
  {
    "id": "poor_concentration",
    "label": "Difficulty concentrating",
    "category": "Mental/behavioral",
    "aliases": [
      "brain fog",
      "can't focus",
      "trouble concentrating",
      "mind going blank"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "persistent_sadness",
    "label": "Persistent sad, empty or hopeless mood",
    "category": "Mental/behavioral",
    "aliases": [
      "feeling down",
      "depressed mood",
      "hopeless",
      "sadness",
      "low mood"
    ],
    "parent": null,
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/depression.html"
  },
  {
    "id": "loss_of_interest",
    "label": "Loss of interest or pleasure in activities",
    "category": "Mental/behavioral",
    "aliases": [
      "anhedonia",
      "don't enjoy things anymore",
      "no motivation"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "feelings_worthless",
    "label": "Feelings of worthlessness or guilt",
    "category": "Mental/behavioral",
    "aliases": [
      "worthless",
      "guilt",
      "feeling useless"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "suicidal_thoughts",
    "label": "Thoughts of self-harm or suicide",
    "category": "Mental/behavioral",
    "aliases": [
      "want to die",
      "suicidal ideation",
      "self harm",
      "thinking about suicide"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "swollen_lymph_nodes",
    "label": "Swollen glands / lymph nodes",
    "category": "Infectious",
    "aliases": [
      "swollen glands",
      "lumps in neck",
      "swollen neck glands",
      "lymphadenopathy"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "chills_and_sweats_cyclical",
    "label": "Recurring cycles of fever, chills and sweating",
    "category": "Infectious",
    "aliases": [
      "fever that comes and goes",
      "cyclical fever",
      "periodic fever and chills"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "bleeding_gums_nose",
    "label": "Bleeding gums or nosebleeds",
    "category": "Other",
    "aliases": [
      "nosebleed",
      "bleeding gums",
      "nose bleeding"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  },
  {
    "id": "easy_bruising",
    "label": "Easy or unexplained bruising",
    "category": "Other",
    "aliases": [
      "bruising easily",
      "unexplained bruises"
    ],
    "parent": null,
    "source": null,
    "source_url": null
  }
];

window.KNOWLEDGE_BASE = {
  "Influenza (Flu)": {
    "id": "influenza",
    "disease_id": "influenza",
    "name": "Influenza (Flu)",
    "description": "A contagious respiratory illness caused by influenza viruses, usually with sudden onset.",
    "category": "Respiratory infection",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "1E30",
    "icd11_title": "Influenza due to identified seasonal influenza virus",
    "icd10_codes": [
      "J11.1"
    ],
    "snomed_code": null,
    "aliases": [
      "flu",
      "grippe",
      "influenza",
      "influenza (flu)",
      "seasonal flu"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/flu/signs-symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "fever": 0.8,
      "high_fever": 0.7,
      "chills": 0.6,
      "cough": 0.7,
      "dry_cough": 0.5,
      "sore_throat": 0.5,
      "runny_nose": 0.4,
      "stuffy_nose": 0.4,
      "muscle_pain": 0.7,
      "body_pain": 0.7,
      "headache": 0.6,
      "fatigue": 0.8,
      "vomiting": 0.3,
      "diarrhea": 0.3
    },
    "against": {},
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d"
    ],
    "rules": [
      {
        "id": "R01",
        "disease_id": "influenza",
        "conditions": {
          "all": [
            "fever",
            "cough",
            "fatigue"
          ]
        },
        "exclusions": [],
        "weight": 0.85,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Classical acute viral triad: sudden fever accompanied by cough and systemic fatigue provides strong heuristic evidence for Influenza.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/flu/signs-symptoms/index.html"
      },
      {
        "id": "R02",
        "disease_id": "influenza",
        "conditions": {
          "all": [
            "high_fever",
            "muscle_pain",
            "chills"
          ]
        },
        "exclusions": [],
        "weight": 0.82,
        "severity": "moderate",
        "priority": 2,
        "explanation": "High fever with prominent myalgias (muscle pain) and shaking chills indicates an acute systemic febrile syndrome typical of Influenza.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/flu/signs-symptoms/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Common Cold": {
    "id": "common_cold",
    "disease_id": "common_cold",
    "name": "Common Cold",
    "description": "A mild viral infection of the nose and throat.",
    "category": "Respiratory infection",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "CA00",
    "icd11_title": "Acute nasopharyngitis",
    "icd10_codes": [
      "J00"
    ],
    "snomed_code": null,
    "aliases": [
      "acute nasopharyngitis",
      "cold",
      "common cold",
      "head cold",
      "upper respiratory infection"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/common-cold/about/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "runny_nose": 0.9,
      "stuffy_nose": 0.8,
      "sneezing": 0.8,
      "sore_throat": 0.7,
      "cough": 0.5,
      "headache": 0.3,
      "body_pain": 0.3,
      "mild_fever": 0.4,
      "fatigue": 0.3,
      "postnasal_drip": 0.4,
      "watery_eyes": 0.3
    },
    "against": {
      "high_fever": 0.3
    },
    "typical_duration": [
      "1-3d",
      "3-7d",
      "1-4w"
    ],
    "rules": [
      {
        "id": "R03",
        "disease_id": "common_cold",
        "conditions": {
          "all": [
            "runny_nose",
            "sneezing",
            "sore_throat"
          ]
        },
        "exclusions": [
          "high_fever"
        ],
        "weight": 0.88,
        "severity": "mild",
        "priority": 1,
        "explanation": "Predominance of rhinorrhea, sneezing, and sore throat in the absence of high fever strongly points towards a localized upper respiratory viral infection (Common Cold).",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/common-cold/about/index.html"
      },
      {
        "id": "R04",
        "disease_id": "common_cold",
        "conditions": {
          "all": [
            "stuffy_nose",
            "postnasal_drip",
            "mild_fever"
          ]
        },
        "exclusions": [],
        "weight": 0.72,
        "severity": "mild",
        "priority": 2,
        "explanation": "Nasal congestion, drainage, and low-grade temperature are classic findings of uncomplicated acute viral rhinitis.",
        "source": "medlineplus",
        "source_url": "https://medlineplus.gov/commoncold.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "COVID-19": {
    "id": "covid19",
    "disease_id": "covid19",
    "name": "COVID-19",
    "description": "A respiratory illness caused by the SARS-CoV-2 virus, ranging from mild to severe.",
    "category": "Respiratory infection",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "RA01",
    "icd11_title": "COVID-19",
    "icd10_codes": [
      "U07.1"
    ],
    "snomed_code": null,
    "aliases": [
      "corona",
      "coronavirus disease",
      "covid",
      "covid-19",
      "sars-cov-2 infection"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/covid/signs-symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "fever": 0.6,
      "chills": 0.4,
      "cough": 0.6,
      "dry_cough": 0.5,
      "shortness_of_breath": 0.6,
      "fatigue": 0.6,
      "muscle_pain": 0.4,
      "body_pain": 0.4,
      "headache": 0.4,
      "loss_of_taste_smell": 0.9,
      "sore_throat": 0.4,
      "stuffy_nose": 0.3,
      "runny_nose": 0.3,
      "nausea": 0.3,
      "vomiting": 0.3,
      "diarrhea": 0.3
    },
    "against": {},
    "typical_duration": [
      "1-3d",
      "3-7d",
      "1-4w"
    ],
    "rules": [
      {
        "id": "R05",
        "disease_id": "covid19",
        "conditions": {
          "any": [
            "loss_of_taste_smell"
          ]
        },
        "exclusions": [],
        "weight": 0.95,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Acute sudden loss of taste or smell (anosmia/ageusia) remains a highly specific hallmark symptom for SARS-CoV-2 / COVID-19.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/covid/signs-symptoms/index.html"
      },
      {
        "id": "R06",
        "disease_id": "covid19",
        "conditions": {
          "all": [
            "fever",
            "cough",
            "shortness_of_breath"
          ]
        },
        "exclusions": [],
        "weight": 0.86,
        "severity": "high",
        "priority": 2,
        "explanation": "Combination of fever, persistent cough, and dyspnea (shortness of breath) raises high suspicion of lower airway involvement from COVID-19.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/covid/signs-symptoms/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Pneumonia": {
    "id": "pneumonia",
    "disease_id": "pneumonia",
    "name": "Pneumonia",
    "description": "An infection that inflames the air sacs in one or both lungs.",
    "category": "Respiratory infection",
    "severity": "severe",
    "urgency": "Severe",
    "icd11_code": "CA40",
    "icd11_title": "Pneumonia, organism unspecified",
    "icd10_codes": [
      "J18.9"
    ],
    "snomed_code": null,
    "aliases": [
      "chest infection",
      "lung infection",
      "pneumonia"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://medlineplus.gov/pneumonia.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "cough": 0.8,
      "productive_cough": 0.8,
      "fever": 0.7,
      "high_fever": 0.6,
      "chills": 0.6,
      "shortness_of_breath": 0.8,
      "rapid_breathing": 0.6,
      "chest_pain": 0.6,
      "fatigue": 0.5,
      "sweating": 0.4,
      "confusion": 0.3,
      "loss_of_appetite": 0.3,
      "nausea": 0.2
    },
    "against": {},
    "typical_duration": [
      "1-3d",
      "3-7d",
      "1-4w"
    ],
    "rules": [
      {
        "id": "R07",
        "disease_id": "pneumonia",
        "conditions": {
          "all": [
            "fever",
            "productive_cough",
            "shortness_of_breath"
          ]
        },
        "exclusions": [],
        "weight": 0.92,
        "severity": "severe",
        "priority": 1,
        "explanation": "Fever together with purulent/productive sputum and respiratory distress strongly suggests lower respiratory alveolar consolidation (Pneumonia).",
        "source": "nhlbi",
        "source_url": "https://www.nhlbi.nih.gov/health/pneumonia/symptoms"
      },
      {
        "id": "R08",
        "disease_id": "pneumonia",
        "conditions": {
          "all": [
            "chest_pain",
            "shortness_of_breath",
            "high_fever"
          ]
        },
        "exclusions": [],
        "weight": 0.89,
        "severity": "severe",
        "priority": 2,
        "explanation": "Pleuritic chest pain in the presence of dyspnea and high fever indicates acute pulmonary inflammatory compromise requiring prompt clinical auscultation and chest imaging.",
        "source": "medlineplus",
        "source_url": "https://medlineplus.gov/pneumonia.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Asthma": {
    "id": "asthma",
    "disease_id": "asthma",
    "name": "Asthma",
    "description": "A chronic condition in which the airways narrow and swell, making breathing difficult at times.",
    "category": "Respiratory (chronic airway)",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "CA23",
    "icd11_title": "Asthma",
    "icd10_codes": [
      "J45.9"
    ],
    "snomed_code": null,
    "aliases": [
      "asthma",
      "asthma attack",
      "bronchial asthma",
      "reactive airway disease"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://medlineplus.gov/asthma.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "wheezing": 0.9,
      "shortness_of_breath": 0.8,
      "chest_tightness": 0.8,
      "cough": 0.6,
      "dry_cough": 0.4
    },
    "against": {
      "high_fever": 0.2
    },
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d",
      "1-4w",
      ">4w"
    ],
    "rules": [
      {
        "id": "R09",
        "disease_id": "asthma",
        "conditions": {
          "all": [
            "wheezing",
            "shortness_of_breath"
          ]
        },
        "exclusions": [
          "high_fever"
        ],
        "weight": 0.94,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Audible expiratory wheezing coupled with reversible shortness of breath is the hallmark clinical pattern of reactive airway disease / Asthma bronchospasm.",
        "source": "nhlbi",
        "source_url": "https://www.nhlbi.nih.gov/health/asthma/symptoms"
      },
      {
        "id": "R10",
        "disease_id": "asthma",
        "conditions": {
          "all": [
            "chest_tightness",
            "wheezing",
            "cough"
          ]
        },
        "exclusions": [],
        "weight": 0.88,
        "severity": "moderate",
        "priority": 2,
        "explanation": "Nocturnal or exertion-triggered chest tightness with wheeze and spasmodic dry cough matches acute asthma exacerbation.",
        "source": "medlineplus",
        "source_url": "https://medlineplus.gov/asthma.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Chronic Obstructive Pulmonary Disease (COPD)": {
    "id": "copd",
    "disease_id": "copd",
    "name": "Chronic Obstructive Pulmonary Disease (COPD)",
    "description": "A long-term lung disease that makes it hard to breathe, most often linked to smoking.",
    "category": "Respiratory (chronic airway)",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "CA22",
    "icd11_title": "Chronic obstructive pulmonary disease",
    "icd10_codes": [
      "J44.9"
    ],
    "snomed_code": null,
    "aliases": [
      "chronic bronchitis",
      "chronic obstructive pulmonary disease (copd)",
      "copd",
      "emphysema"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://medlineplus.gov/copd.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "shortness_of_breath": 0.8,
      "cough": 0.8,
      "productive_cough": 0.7,
      "wheezing": 0.6,
      "chest_tightness": 0.5,
      "fatigue": 0.4
    },
    "against": {},
    "typical_duration": [
      ">4w"
    ],
    "rules": [
      {
        "id": "R11",
        "disease_id": "copd",
        "conditions": {
          "all": [
            "shortness_of_breath",
            "productive_cough",
            "wheezing"
          ]
        },
        "exclusions": [],
        "weight": 0.85,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Chronic progressive dyspnea with chronic productive cough and wheezing in an adult suggests Chronic Obstructive Pulmonary Disease.",
        "source": "nhlbi",
        "source_url": "https://www.nhlbi.nih.gov/health/copd/symptoms"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Acute Bronchitis (Chest Cold)": {
    "id": "acute_bronchitis",
    "disease_id": "acute_bronchitis",
    "name": "Acute Bronchitis (Chest Cold)",
    "description": "Inflammation of the airways in the lungs, usually after a viral infection, causing a lingering cough.",
    "category": "Respiratory infection",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "CA20",
    "icd11_title": "Acute bronchitis",
    "icd10_codes": [
      "J20.9"
    ],
    "snomed_code": null,
    "aliases": [
      "acute bronchitis (chest cold)",
      "bronchitis",
      "chest cold"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/acute-bronchitis/about/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "cough": 0.9,
      "productive_cough": 0.7,
      "chest_tightness": 0.4,
      "fatigue": 0.4,
      "sore_throat": 0.3,
      "runny_nose": 0.3,
      "stuffy_nose": 0.3,
      "mild_fever": 0.3,
      "headache": 0.3,
      "body_pain": 0.3,
      "wheezing": 0.3,
      "shortness_of_breath": 0.3
    },
    "against": {
      "high_fever": 0.25
    },
    "typical_duration": [
      "3-7d",
      "1-4w"
    ],
    "rules": [
      {
        "id": "R12",
        "disease_id": "acute_bronchitis",
        "conditions": {
          "all": [
            "cough",
            "productive_cough",
            "chest_tightness"
          ]
        },
        "exclusions": [
          "high_fever",
          "shortness_of_breath"
        ],
        "weight": 0.8,
        "severity": "mild",
        "priority": 1,
        "explanation": "Lingering productive cough without severe dyspnea or high fevers suggests acute self-limiting tracheobronchial inflammation (Acute Bronchitis).",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/acute-bronchitis/about/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Strep Throat": {
    "id": "strep_throat",
    "disease_id": "strep_throat",
    "name": "Strep Throat",
    "description": "A bacterial throat infection caused by group A Streptococcus.",
    "category": "ENT infection",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "CA02.0",
    "icd11_title": "Streptococcal pharyngitis",
    "icd10_codes": [
      "J02.0"
    ],
    "snomed_code": null,
    "aliases": [
      "strep",
      "strep throat",
      "streptococcal pharyngitis"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/group-a-strep/about/strep-throat.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "sore_throat": 0.9,
      "painful_swallowing": 0.8,
      "fever": 0.7,
      "swollen_tonsils": 0.8,
      "swollen_lymph_nodes": 0.7,
      "headache": 0.4,
      "nausea": 0.3,
      "vomiting": 0.3,
      "stomach_pain": 0.3,
      "rash": 0.2
    },
    "against": {
      "cough": 0.25,
      "runny_nose": 0.2,
      "hoarse_voice": 0.15
    },
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d"
    ],
    "rules": [
      {
        "id": "R13",
        "disease_id": "strep_throat",
        "conditions": {
          "all": [
            "sore_throat",
            "painful_swallowing",
            "fever"
          ]
        },
        "exclusions": [
          "cough"
        ],
        "weight": 0.9,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Severe sore throat with fever and absence of viral cough (Centor criteria) substantially elevates the likelihood of group A Streptococcal pharyngitis.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/group-a-strep/about/strep-throat.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Sinusitis (Sinus Infection)": {
    "id": "sinusitis",
    "disease_id": "sinusitis",
    "name": "Sinusitis (Sinus Infection)",
    "description": "Inflammation of the sinuses, often following a cold, causing facial pressure and congestion.",
    "category": "ENT infection",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "CA01",
    "icd11_title": "Acute sinusitis",
    "icd10_codes": [
      "J01.9"
    ],
    "snomed_code": null,
    "aliases": [
      "acute sinusitis",
      "rhinosinusitis",
      "sinus infection",
      "sinusitis (sinus infection)"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/sinus-infection/about/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "facial_pain": 0.9,
      "stuffy_nose": 0.8,
      "postnasal_drip": 0.7,
      "runny_nose": 0.6,
      "headache": 0.5,
      "cough": 0.4,
      "fever": 0.3,
      "sore_throat": 0.3,
      "fatigue": 0.3
    },
    "against": {},
    "typical_duration": [
      "3-7d",
      "1-4w"
    ],
    "rules": [
      {
        "id": "R14",
        "disease_id": "sinusitis",
        "conditions": {
          "all": [
            "facial_pain",
            "stuffy_nose",
            "postnasal_drip"
          ]
        },
        "exclusions": [],
        "weight": 0.87,
        "severity": "mild",
        "priority": 1,
        "explanation": "Localized facial sinus pressure / headache accompanied by purulent postnasal drip points to acute paranasal rhinosinusitis.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/sinus-infection/about/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Allergic Rhinitis (Hay Fever)": {
    "id": "allergic_rhinitis",
    "disease_id": "allergic_rhinitis",
    "name": "Allergic Rhinitis (Hay Fever)",
    "description": "An allergic reaction to airborne substances such as pollen, dust mites or pet dander.",
    "category": "Allergic / ENT",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "4A85.0",
    "icd11_title": "Allergic rhinitis due to pollen",
    "icd10_codes": [
      "J30.1"
    ],
    "snomed_code": null,
    "aliases": [
      "allergic rhinitis (hay fever)",
      "hay fever",
      "nasal allergies",
      "pollen allergy",
      "seasonal allergies"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://medlineplus.gov/hayfever.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "sneezing": 0.9,
      "runny_nose": 0.8,
      "stuffy_nose": 0.7,
      "itchy_eyes": 0.8,
      "watery_eyes": 0.7,
      "itchy_nose_throat": 0.8,
      "postnasal_drip": 0.4,
      "cough": 0.3,
      "fatigue": 0.3,
      "red_eyes": 0.3
    },
    "against": {
      "fever": 0.4,
      "high_fever": 0.4,
      "body_pain": 0.2
    },
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d",
      "1-4w",
      ">4w"
    ],
    "rules": [
      {
        "id": "R15",
        "disease_id": "allergic_rhinitis",
        "conditions": {
          "all": [
            "sneezing",
            "itchy_eyes",
            "runny_nose"
          ]
        },
        "exclusions": [
          "fever"
        ],
        "weight": 0.92,
        "severity": "mild",
        "priority": 1,
        "explanation": "Pruritus of the eyes and palate paired with clear rhinorrhea and paroxysmal sneezing without pyrexia is typical of allergic rhinitis.",
        "source": "medlineplus",
        "source_url": "https://medlineplus.gov/hayfever.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Middle Ear Infection (Otitis Media)": {
    "id": "otitis_media",
    "disease_id": "otitis_media",
    "name": "Middle Ear Infection (Otitis Media)",
    "description": "An infection of the middle ear, most common in young children.",
    "category": "ENT infection",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "AA30",
    "icd11_title": "Acute otitis media",
    "icd10_codes": [
      "H66.9"
    ],
    "snomed_code": null,
    "aliases": [
      "acute otitis media",
      "ear infection",
      "middle ear infection (otitis media)",
      "otitis media"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/ear-infection/about/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "ear_pain": 0.95,
      "fever": 0.5,
      "hearing_loss": 0.5,
      "ear_discharge": 0.5,
      "irritability": 0.4,
      "sleep_problems": 0.3,
      "headache": 0.2
    },
    "against": {},
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d"
    ],
    "rules": [
      {
        "id": "R16",
        "disease_id": "otitis_media",
        "conditions": {
          "all": [
            "ear_pain",
            "fever"
          ]
        },
        "exclusions": [],
        "weight": 0.89,
        "severity": "mild",
        "priority": 1,
        "explanation": "Otalgia (earache) accompanied by systemic fever suggests acute middle ear inflammation / infection.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/ear-infection/about/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Conjunctivitis (Pink Eye)": {
    "id": "conjunctivitis",
    "disease_id": "conjunctivitis",
    "name": "Conjunctivitis (Pink Eye)",
    "description": "Inflammation of the thin membrane covering the white of the eye and inner eyelid.",
    "category": "Eye",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "9A60",
    "icd11_title": "Conjunctivitis",
    "icd10_codes": [
      "H10.9"
    ],
    "snomed_code": null,
    "aliases": [
      "conjunctivitis",
      "conjunctivitis (pink eye)",
      "eye infection",
      "pink eye"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/conjunctivitis/about/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "red_eyes": 0.9,
      "eye_discharge": 0.8,
      "itchy_eyes": 0.6,
      "watery_eyes": 0.7,
      "light_sensitivity": 0.2
    },
    "against": {},
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d",
      "1-4w"
    ],
    "rules": [
      {
        "id": "R17",
        "disease_id": "conjunctivitis",
        "conditions": {
          "all": [
            "red_eyes",
            "eye_discharge"
          ]
        },
        "exclusions": [],
        "weight": 0.91,
        "severity": "mild",
        "priority": 1,
        "explanation": "Ocular hyperemia (red eyes) with sticky discharge or crusting on eyelids is pathognomonic for acute conjunctivitis.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/conjunctivitis/about/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Migraine": {
    "id": "migraine",
    "disease_id": "migraine",
    "name": "Migraine",
    "description": "A primary headache disorder with recurrent, often throbbing headaches that can include nausea and sensitivity to light or sound.",
    "category": "Neurological",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "8A80",
    "icd11_title": "Migraine",
    "icd10_codes": [
      "G43.9"
    ],
    "snomed_code": null,
    "aliases": [
      "migraine",
      "migraine headache",
      "sick headache"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://medlineplus.gov/migraine.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "headache": 0.7,
      "severe_headache": 0.6,
      "one_sided_headache": 0.9,
      "nausea": 0.7,
      "vomiting": 0.5,
      "light_sensitivity": 0.8,
      "sound_sensitivity": 0.7,
      "visual_aura": 0.7,
      "dizziness": 0.3,
      "fatigue": 0.3,
      "blurred_vision": 0.3
    },
    "against": {
      "fever": 0.3,
      "high_fever": 0.3
    },
    "typical_duration": [
      "<1d",
      "1-3d"
    ],
    "rules": [
      {
        "id": "R18",
        "disease_id": "migraine",
        "conditions": {
          "all": [
            "one_sided_headache",
            "nausea"
          ]
        },
        "exclusions": [],
        "weight": 0.93,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Pulsating unilateral hemicranial cephalalgia with nausea fulfills primary diagnostic criteria for Migraine.",
        "source": "medlineplus",
        "source_url": "https://medlineplus.gov/migraine.html"
      },
      {
        "id": "R19",
        "disease_id": "migraine",
        "conditions": {
          "all": [
            "headache",
            "light_sensitivity",
            "sound_sensitivity"
          ]
        },
        "exclusions": [],
        "weight": 0.88,
        "severity": "moderate",
        "priority": 2,
        "explanation": "Severe headache accompanied by both photophobia and phonophobia strongly indicates migraine physiology over simple tension cephalea.",
        "source": "ninds",
        "source_url": "https://www.ninds.nih.gov/health-information/disorders/migraine"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Tension-Type Headache": {
    "id": "tension_headache",
    "disease_id": "tension_headache",
    "name": "Tension-Type Headache",
    "description": "The most common type of headache, typically felt as a dull pressure or tight band around the head.",
    "category": "Neurological",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "8A81",
    "icd11_title": "Tension-type headache",
    "icd10_codes": [
      "G44.2"
    ],
    "snomed_code": null,
    "aliases": [
      "stress headache",
      "tension headache",
      "tension-type headache"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://medlineplus.gov/headache.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "head_pressure": 0.9,
      "headache": 0.7,
      "muscle_tension": 0.5,
      "sleep_problems": 0.3,
      "light_sensitivity": 0.2,
      "sound_sensitivity": 0.2,
      "poor_concentration": 0.2
    },
    "against": {
      "vomiting": 0.2,
      "fever": 0.25,
      "one_sided_headache": 0.2
    },
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d",
      "1-4w",
      ">4w"
    ],
    "rules": [
      {
        "id": "R20",
        "disease_id": "tension_headache",
        "conditions": {
          "all": [
            "head_pressure",
            "headache"
          ]
        },
        "exclusions": [
          "vomiting",
          "one_sided_headache"
        ],
        "weight": 0.84,
        "severity": "mild",
        "priority": 1,
        "explanation": "Bilateral band-like compressive cephalalgia without severe gastrointestinal autonomic symptoms corresponds to tension-type headache.",
        "source": "medlineplus",
        "source_url": "https://medlineplus.gov/headache.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Gastritis": {
    "id": "gastritis",
    "disease_id": "gastritis",
    "name": "Gastritis",
    "description": "Inflammation of the stomach lining.",
    "category": "Gastrointestinal",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "DA42",
    "icd11_title": "Gastritis",
    "icd10_codes": [
      "K29.7"
    ],
    "snomed_code": null,
    "aliases": [
      "acute gastritis",
      "gastritis",
      "gastropathy",
      "stomach inflammation"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.niddk.nih.gov/health-information/digestive-diseases/gastritis-gastropathy/symptoms-causes",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "upper_abdominal_pain": 0.9,
      "stomach_pain": 0.7,
      "nausea": 0.7,
      "vomiting": 0.5,
      "bloating": 0.5,
      "indigestion": 0.6,
      "loss_of_appetite": 0.5
    },
    "against": {
      "diarrhea": 0.15
    },
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d",
      "1-4w",
      ">4w"
    ],
    "rules": [
      {
        "id": "R21",
        "disease_id": "gastritis",
        "conditions": {
          "all": [
            "upper_abdominal_pain",
            "nausea",
            "indigestion"
          ]
        },
        "exclusions": [],
        "weight": 0.86,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Epigastric abdominal burning discomfort associated with postprandial dyspepsia and nausea reflects acute gastric mucosal irritation.",
        "source": "niddk",
        "source_url": "https://www.niddk.nih.gov/health-information/digestive-diseases/gastritis-gastropathy/symptoms-causes"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Gastroesophageal Reflux Disease (GERD)": {
    "id": "gerd",
    "disease_id": "gerd",
    "name": "Gastroesophageal Reflux Disease (GERD)",
    "description": "A condition in which stomach contents frequently flow back into the esophagus.",
    "category": "Gastrointestinal",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "DA22",
    "icd11_title": "Gastro-oesophageal reflux disease",
    "icd10_codes": [
      "K21.9"
    ],
    "snomed_code": null,
    "aliases": [
      "acid reflux disease",
      "gastroesophageal reflux disease (gerd)",
      "gerd",
      "gord",
      "reflux"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/symptoms-causes",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "heartburn": 0.9,
      "regurgitation": 0.8,
      "chest_pain": 0.4,
      "indigestion": 0.5,
      "upper_abdominal_pain": 0.3,
      "nausea": 0.3,
      "painful_swallowing": 0.2,
      "hoarse_voice": 0.3,
      "dry_cough": 0.3
    },
    "against": {
      "fever": 0.2
    },
    "typical_duration": [
      "3-7d",
      "1-4w",
      ">4w"
    ],
    "rules": [
      {
        "id": "R22",
        "disease_id": "gerd",
        "conditions": {
          "all": [
            "heartburn",
            "regurgitation"
          ]
        },
        "exclusions": [],
        "weight": 0.95,
        "severity": "mild",
        "priority": 1,
        "explanation": "Retrosternal pyrosis (burning) and acid regurgitation into the hypopharynx are cardinal clinical hallmarks of Gastroesophageal Reflux Disease.",
        "source": "niddk",
        "source_url": "https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults/symptoms-causes"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Viral Gastroenteritis (Stomach Flu)": {
    "id": "gastroenteritis",
    "disease_id": "gastroenteritis",
    "name": "Viral Gastroenteritis (Stomach Flu)",
    "description": "Inflammation of the stomach and intestines caused by a virus, leading to diarrhea and vomiting.",
    "category": "Gastrointestinal infection",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "1A40.0",
    "icd11_title": "Infectious gastroenteritis or colitis",
    "icd10_codes": [
      "A09"
    ],
    "snomed_code": null,
    "aliases": [
      "gastroenteritis",
      "norovirus",
      "stomach bug",
      "stomach flu",
      "viral gastroenteritis (stomach flu)"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.niddk.nih.gov/health-information/digestive-diseases/viral-gastroenteritis/symptoms-causes",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "diarrhea": 0.9,
      "vomiting": 0.8,
      "nausea": 0.7,
      "abdominal_cramps": 0.7,
      "stomach_pain": 0.6,
      "mild_fever": 0.4,
      "fever": 0.3,
      "headache": 0.3,
      "body_pain": 0.3,
      "dehydration_signs": 0.4
    },
    "against": {},
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d"
    ],
    "rules": [
      {
        "id": "R23",
        "disease_id": "gastroenteritis",
        "conditions": {
          "all": [
            "diarrhea",
            "vomiting",
            "abdominal_cramps"
          ]
        },
        "exclusions": [],
        "weight": 0.92,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Concurrent acute watery enteritis (diarrhea), emesis, and crampy abdominal pain constitutes acute viral gastroenteritis syndrome.",
        "source": "niddk",
        "source_url": "https://www.niddk.nih.gov/health-information/digestive-diseases/viral-gastroenteritis/symptoms-causes"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Food Poisoning (Foodborne Illness)": {
    "id": "food_poisoning",
    "disease_id": "food_poisoning",
    "name": "Food Poisoning (Foodborne Illness)",
    "description": "Illness caused by eating food or drinking water contaminated with germs or toxins.",
    "category": "Gastrointestinal infection",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "1A10",
    "icd11_title": "Bacterial foodborne intoxications",
    "icd10_codes": [
      "A05.9"
    ],
    "snomed_code": null,
    "aliases": [
      "food borne disease",
      "food poisoning",
      "food poisoning (foodborne illness)",
      "foodborne illness"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/food-safety/signs-symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "vomiting": 0.8,
      "diarrhea": 0.8,
      "nausea": 0.8,
      "abdominal_cramps": 0.7,
      "stomach_pain": 0.6,
      "fever": 0.4
    },
    "against": {},
    "typical_duration": [
      "<1d",
      "1-3d"
    ],
    "rules": [],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Irritable Bowel Syndrome (IBS)": {
    "id": "ibs",
    "disease_id": "ibs",
    "name": "Irritable Bowel Syndrome (IBS)",
    "description": "A long-term functional disorder causing abdominal pain together with changes in bowel habits.",
    "category": "Gastrointestinal",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "DD91.0",
    "icd11_title": "Irritable bowel syndrome",
    "icd10_codes": [
      "K58.9"
    ],
    "snomed_code": null,
    "aliases": [
      "ibs",
      "irritable bowel syndrome (ibs)",
      "irritable colon",
      "spastic colon"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome/symptoms-causes",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "stomach_pain": 0.7,
      "abdominal_cramps": 0.7,
      "bloating": 0.8,
      "diarrhea": 0.6,
      "constipation": 0.6
    },
    "against": {
      "fever": 0.3,
      "high_fever": 0.3,
      "black_stools": 0.4,
      "weight_loss": 0.3,
      "vomiting_blood": 0.4
    },
    "typical_duration": [
      ">4w"
    ],
    "rules": [],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Appendicitis": {
    "id": "appendicitis",
    "disease_id": "appendicitis",
    "name": "Appendicitis",
    "description": "Inflammation of the appendix; it is a medical emergency that usually requires surgery.",
    "category": "Gastrointestinal (surgical)",
    "severity": "severe",
    "urgency": "Severe",
    "icd11_code": "DB10",
    "icd11_title": "Acute appendicitis",
    "icd10_codes": [
      "K35.8"
    ],
    "snomed_code": null,
    "aliases": [
      "acute appendicitis",
      "appendicitis",
      "inflamed appendix"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.niddk.nih.gov/health-information/digestive-diseases/appendicitis/symptoms-causes",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "right_lower_abdominal_pain": 0.95,
      "stomach_pain": 0.6,
      "severe_abdominal_pain": 0.6,
      "nausea": 0.6,
      "vomiting": 0.6,
      "loss_of_appetite": 0.6,
      "fever": 0.5,
      "mild_fever": 0.4,
      "constipation": 0.3,
      "diarrhea": 0.3,
      "bloating": 0.3
    },
    "against": {},
    "typical_duration": [
      "<1d",
      "1-3d"
    ],
    "rules": [
      {
        "id": "R24",
        "disease_id": "appendicitis",
        "conditions": {
          "all": [
            "right_lower_abdominal_pain",
            "nausea"
          ]
        },
        "exclusions": [],
        "weight": 0.93,
        "severity": "severe",
        "priority": 1,
        "explanation": "Localized right iliac fossa (McBurney's point) tenderness and nausea indicates acute appendicitis and mandates emergency surgical triage.",
        "source": "niddk",
        "source_url": "https://www.niddk.nih.gov/health-information/digestive-diseases/appendicitis/symptoms-causes"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Hepatitis A": {
    "id": "hepatitis_a",
    "disease_id": "hepatitis_a",
    "name": "Hepatitis A",
    "description": "A contagious liver infection caused by the hepatitis A virus, usually spread through contaminated food or water.",
    "category": "Liver infection",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "1E50.0",
    "icd11_title": "Acute hepatitis A",
    "icd10_codes": [
      "B15.9"
    ],
    "snomed_code": null,
    "aliases": [
      "hav infection",
      "hep a",
      "hepatitis a",
      "infectious hepatitis"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/hepatitis-a/signs-symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "jaundice": 0.9,
      "dark_urine": 0.8,
      "clay_colored_stools": 0.8,
      "fatigue": 0.6,
      "nausea": 0.6,
      "vomiting": 0.5,
      "stomach_pain": 0.5,
      "loss_of_appetite": 0.6,
      "fever": 0.5,
      "joint_pain": 0.3,
      "diarrhea": 0.3
    },
    "against": {},
    "typical_duration": [
      "3-7d",
      "1-4w",
      ">4w"
    ],
    "rules": [
      {
        "id": "R25",
        "disease_id": "hepatitis_a",
        "conditions": {
          "all": [
            "jaundice",
            "dark_urine",
            "clay_colored_stools"
          ]
        },
        "exclusions": [],
        "weight": 0.96,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Classic cholestatic/hepatocellular triad: scleral icterus (jaundice), bilirubinuria (dark urine), and acholic (clay) stools.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/hepatitis-a/signs-symptoms/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Dengue Fever": {
    "id": "dengue",
    "disease_id": "dengue",
    "name": "Dengue Fever",
    "description": "A mosquito-borne viral infection common in tropical and subtropical regions.",
    "category": "Vector-borne infection",
    "severity": "severe",
    "urgency": "Severe",
    "icd11_code": "1D20",
    "icd11_title": "Dengue without warning signs",
    "icd10_codes": [
      "A90"
    ],
    "snomed_code": null,
    "aliases": [
      "breakbone fever",
      "dengue",
      "dengue fever"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/dengue/signs-symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "high_fever": 0.9,
      "fever": 0.8,
      "severe_headache": 0.7,
      "headache": 0.6,
      "eye_pain_behind": 0.8,
      "muscle_pain": 0.7,
      "joint_pain": 0.7,
      "body_pain": 0.6,
      "rash": 0.6,
      "nausea": 0.5,
      "vomiting": 0.5,
      "swollen_lymph_nodes": 0.4,
      "fatigue": 0.4
    },
    "against": {},
    "typical_duration": [
      "1-3d",
      "3-7d"
    ],
    "rules": [
      {
        "id": "R26",
        "disease_id": "dengue",
        "conditions": {
          "all": [
            "high_fever",
            "eye_pain_behind",
            "joint_pain"
          ]
        },
        "exclusions": [],
        "weight": 0.94,
        "severity": "severe",
        "priority": 1,
        "explanation": "Sudden high fever combined with retro-orbital pain and severe arthralgia ('breakbone fever') strongly suggests Dengue infection.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/dengue/signs-symptoms/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Malaria": {
    "id": "malaria",
    "disease_id": "malaria",
    "name": "Malaria",
    "description": "A mosquito-borne parasitic disease that can become life-threatening if not treated promptly.",
    "category": "Vector-borne infection",
    "severity": "severe",
    "urgency": "Severe",
    "icd11_code": "1F40",
    "icd11_title": "Malaria",
    "icd10_codes": [
      "B54"
    ],
    "snomed_code": null,
    "aliases": [
      "malaria",
      "plasmodium infection"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/malaria/symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "chills_and_sweats_cyclical": 0.9,
      "fever": 0.8,
      "high_fever": 0.7,
      "chills": 0.8,
      "sweating": 0.6,
      "headache": 0.6,
      "body_pain": 0.5,
      "muscle_pain": 0.5,
      "nausea": 0.5,
      "vomiting": 0.5,
      "fatigue": 0.5,
      "diarrhea": 0.2
    },
    "against": {},
    "typical_duration": [
      "1-3d",
      "3-7d",
      "1-4w"
    ],
    "rules": [
      {
        "id": "R27",
        "disease_id": "malaria",
        "conditions": {
          "all": [
            "chills_and_sweats_cyclical",
            "fever"
          ]
        },
        "exclusions": [],
        "weight": 0.95,
        "severity": "severe",
        "priority": 1,
        "explanation": "Paroxysmal cyclical shivering rigors followed by high fevers and drenching diaphoresis is the hallmark of plasmodial Malaria.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/malaria/symptoms/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Typhoid Fever": {
    "id": "typhoid",
    "disease_id": "typhoid",
    "name": "Typhoid Fever",
    "description": "A bacterial infection caused by Salmonella Typhi, spread through contaminated food and water.",
    "category": "Enteric bacterial infection",
    "severity": "severe",
    "urgency": "Severe",
    "icd11_code": "1A07",
    "icd11_title": "Typhoid fever",
    "icd10_codes": [
      "A01.0"
    ],
    "snomed_code": null,
    "aliases": [
      "enteric fever",
      "typhoid",
      "typhoid fever"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/typhoid-fever/signs-symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "fever": 0.8,
      "high_fever": 0.7,
      "stomach_pain": 0.6,
      "headache": 0.6,
      "fatigue": 0.7,
      "loss_of_appetite": 0.6,
      "constipation": 0.4,
      "diarrhea": 0.4,
      "body_pain": 0.4,
      "rash": 0.2
    },
    "against": {},
    "typical_duration": [
      "3-7d",
      "1-4w"
    ],
    "rules": [
      {
        "id": "R28",
        "disease_id": "typhoid",
        "conditions": {
          "all": [
            "fever",
            "stomach_pain",
            "headache",
            "fatigue"
          ]
        },
        "exclusions": [],
        "weight": 0.84,
        "severity": "severe",
        "priority": 1,
        "explanation": "Step-ladder rising fever with dull abdominal pain, headache, and severe malaise indicates systemic Salmonella Typhi infection.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/typhoid-fever/signs-symptoms/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Tuberculosis (TB)": {
    "id": "tuberculosis",
    "disease_id": "tuberculosis",
    "name": "Tuberculosis (TB)",
    "description": "A bacterial infection that usually affects the lungs and causes a long-lasting cough.",
    "category": "Respiratory infection",
    "severity": "severe",
    "urgency": "Severe",
    "icd11_code": "1B10",
    "icd11_title": "Respiratory tuberculosis",
    "icd10_codes": [
      "A15.0"
    ],
    "snomed_code": null,
    "aliases": [
      "pulmonary tuberculosis",
      "tb",
      "tuberculosis",
      "tuberculosis (tb)"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/tb/signs-symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "cough": 0.7,
      "productive_cough": 0.5,
      "coughing_blood": 0.6,
      "chest_pain": 0.4,
      "weight_loss": 0.8,
      "night_sweats": 0.8,
      "fever": 0.5,
      "chills": 0.3,
      "fatigue": 0.6,
      "loss_of_appetite": 0.5
    },
    "against": {},
    "typical_duration": [
      "1-4w",
      ">4w"
    ],
    "rules": [
      {
        "id": "R29",
        "disease_id": "tuberculosis",
        "conditions": {
          "all": [
            "cough",
            "night_sweats",
            "weight_loss"
          ]
        },
        "exclusions": [],
        "weight": 0.92,
        "severity": "severe",
        "priority": 1,
        "explanation": "Chronic persistent cough with nocturnal diaphoresis and unexplained constitutional weight loss demands sputum acid-fast evaluation for Tuberculosis.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/tb/signs-symptoms/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Infectious Mononucleosis (Mono)": {
    "id": "mononucleosis",
    "disease_id": "mononucleosis",
    "name": "Infectious Mononucleosis (Mono)",
    "description": "A viral illness, usually caused by Epstein-Barr virus, most common in teens and young adults.",
    "category": "Viral infection",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "1D81",
    "icd11_title": "Infectious mononucleosis",
    "icd10_codes": [
      "B27.9"
    ],
    "snomed_code": null,
    "aliases": [
      "ebv infection",
      "glandular fever",
      "infectious mononucleosis (mono)",
      "kissing disease",
      "mono"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/epstein-barr/about/mononucleosis.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "fatigue": 0.9,
      "sore_throat": 0.8,
      "fever": 0.7,
      "swollen_lymph_nodes": 0.8,
      "swollen_tonsils": 0.6,
      "headache": 0.4,
      "body_pain": 0.4,
      "rash": 0.2
    },
    "against": {},
    "typical_duration": [
      "3-7d",
      "1-4w",
      ">4w"
    ],
    "rules": [],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Chickenpox (Varicella)": {
    "id": "chickenpox",
    "disease_id": "chickenpox",
    "name": "Chickenpox (Varicella)",
    "description": "A highly contagious viral infection causing an itchy, blister-like rash.",
    "category": "Viral infection (rash)",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "1E90",
    "icd11_title": "Varicella",
    "icd10_codes": [
      "B01.9"
    ],
    "snomed_code": null,
    "aliases": [
      "chicken pox",
      "chickenpox",
      "chickenpox (varicella)",
      "varicella"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/chickenpox/signs-symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "itchy_rash": 0.95,
      "rash": 0.7,
      "fever": 0.5,
      "mild_fever": 0.4,
      "fatigue": 0.5,
      "loss_of_appetite": 0.4,
      "headache": 0.4
    },
    "against": {},
    "typical_duration": [
      "1-3d",
      "3-7d",
      "1-4w"
    ],
    "rules": [],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Measles": {
    "id": "measles",
    "disease_id": "measles",
    "name": "Measles",
    "description": "A highly contagious viral disease that starts with fever, cough and red eyes, followed by a rash.",
    "category": "Viral infection (rash)",
    "severity": "severe",
    "urgency": "Severe",
    "icd11_code": "1F03",
    "icd11_title": "Measles without complication",
    "icd10_codes": [
      "B05.9"
    ],
    "snomed_code": null,
    "aliases": [
      "measles",
      "rubeola"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/measles/signs-symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "high_fever": 0.8,
      "fever": 0.7,
      "cough": 0.6,
      "runny_nose": 0.6,
      "red_eyes": 0.7,
      "watery_eyes": 0.4,
      "rash": 0.8,
      "koplik_spots": 0.95
    },
    "against": {},
    "typical_duration": [
      "1-3d",
      "3-7d",
      "1-4w"
    ],
    "rules": [
      {
        "id": "R30",
        "disease_id": "measles",
        "conditions": {
          "all": [
            "koplik_spots"
          ]
        },
        "exclusions": [],
        "weight": 0.98,
        "severity": "severe",
        "priority": 1,
        "explanation": "Koplik spots on the buccal mucosa are pathognomonic enanthem for Measles (rubeola) infection.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/measles/signs-symptoms/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Urinary Tract Infection (UTI)": {
    "id": "uti",
    "disease_id": "uti",
    "name": "Urinary Tract Infection (UTI)",
    "description": "An infection in any part of the urinary system, most often the bladder.",
    "category": "Genitourinary infection",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "GC08",
    "icd11_title": "Urinary tract infection, site not specified",
    "icd10_codes": [
      "N39.0"
    ],
    "snomed_code": null,
    "aliases": [
      "bladder infection",
      "cystitis",
      "urinary tract infection (uti)",
      "urine infection",
      "uti"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/uti/about/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "painful_urination": 0.9,
      "frequent_urination": 0.8,
      "urgent_urination": 0.8,
      "cloudy_urine": 0.7,
      "pelvic_pain": 0.7,
      "blood_in_urine": 0.4,
      "mild_fever": 0.2
    },
    "against": {},
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d"
    ],
    "rules": [
      {
        "id": "R31",
        "disease_id": "uti",
        "conditions": {
          "all": [
            "painful_urination",
            "frequent_urination",
            "urgent_urination"
          ]
        },
        "exclusions": [],
        "weight": 0.94,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Acute lower urinary tract irritative triad (dysuria, urinary frequency, and urgency) establishes high probability for acute cystitis/UTI.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/uti/about/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Kidney Stones": {
    "id": "kidney_stones",
    "disease_id": "kidney_stones",
    "name": "Kidney Stones",
    "description": "Hard deposits that form in the kidneys and can cause severe pain as they pass.",
    "category": "Genitourinary",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "GB70",
    "icd11_title": "Calculus of kidney",
    "icd10_codes": [
      "N20.0"
    ],
    "snomed_code": null,
    "aliases": [
      "kidney stone",
      "kidney stones",
      "nephrolithiasis",
      "renal calculi",
      "urolithiasis"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/symptoms-causes",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "flank_pain": 0.9,
      "blood_in_urine": 0.7,
      "painful_urination": 0.5,
      "nausea": 0.5,
      "vomiting": 0.5,
      "back_pain": 0.4,
      "frequent_urination": 0.3,
      "cloudy_urine": 0.3,
      "fever": 0.2
    },
    "against": {},
    "typical_duration": [
      "<1d",
      "1-3d",
      "3-7d"
    ],
    "rules": [
      {
        "id": "R32",
        "disease_id": "kidney_stones",
        "conditions": {
          "all": [
            "flank_pain",
            "blood_in_urine"
          ]
        },
        "exclusions": [],
        "weight": 0.93,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Severe sharp unilateral flank pain accompanied by gross or microscopic hematuria is typical for nephrolithiasis / ureteral calculus passage.",
        "source": "niddk",
        "source_url": "https://www.niddk.nih.gov/health-information/urologic-diseases/kidney-stones/symptoms-causes"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Iron-Deficiency Anemia": {
    "id": "iron_deficiency_anemia",
    "disease_id": "iron_deficiency_anemia",
    "name": "Iron-Deficiency Anemia",
    "description": "A condition in which the body lacks enough iron to make adequate healthy red blood cells.",
    "category": "Blood",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "3A00",
    "icd11_title": "Iron deficiency anaemia",
    "icd10_codes": [
      "D50.9"
    ],
    "snomed_code": null,
    "aliases": [
      "anaemia",
      "anemia",
      "iron deficiency",
      "iron-deficiency anemia",
      "low iron"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.nhlbi.nih.gov/health/anemia/symptoms",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "fatigue": 0.8,
      "pale_skin": 0.7,
      "shortness_of_breath": 0.4,
      "dizziness": 0.5,
      "lightheadedness": 0.5,
      "headache": 0.3,
      "palpitations": 0.4,
      "cold_intolerance": 0.4
    },
    "against": {},
    "typical_duration": [
      "1-4w",
      ">4w"
    ],
    "rules": [
      {
        "id": "R33",
        "disease_id": "iron_deficiency_anemia",
        "conditions": {
          "all": [
            "fatigue",
            "pale_skin",
            "dizziness"
          ]
        },
        "exclusions": [
          "fever"
        ],
        "weight": 0.86,
        "severity": "mild",
        "priority": 1,
        "explanation": "Generalized asthenia/fatigue with mucocutaneous pallor and postural lightheadedness without pyrexia suggests chronic anemia.",
        "source": "nhlbi",
        "source_url": "https://www.nhlbi.nih.gov/health/anemia/symptoms"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Hypothyroidism (Underactive Thyroid)": {
    "id": "hypothyroidism",
    "disease_id": "hypothyroidism",
    "name": "Hypothyroidism (Underactive Thyroid)",
    "description": "A condition in which the thyroid gland does not make enough thyroid hormone.",
    "category": "Endocrine",
    "severity": "mild",
    "urgency": "Mild",
    "icd11_code": "5A00",
    "icd11_title": "Hypothyroidism",
    "icd10_codes": [
      "E03.9"
    ],
    "snomed_code": null,
    "aliases": [
      "hypothyroid",
      "hypothyroidism (underactive thyroid)",
      "low thyroid",
      "underactive thyroid"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.niddk.nih.gov/health-information/endocrine-diseases/hypothyroidism",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "fatigue": 0.7,
      "weight_gain": 0.7,
      "cold_intolerance": 0.8,
      "constipation": 0.5,
      "dry_skin": 0.6,
      "thinning_hair": 0.6,
      "persistent_sadness": 0.3,
      "joint_pain": 0.3,
      "muscle_pain": 0.3,
      "poor_concentration": 0.3
    },
    "against": {},
    "typical_duration": [
      ">4w"
    ],
    "rules": [
      {
        "id": "R34",
        "disease_id": "hypothyroidism",
        "conditions": {
          "all": [
            "fatigue",
            "cold_intolerance",
            "weight_gain"
          ]
        },
        "exclusions": [],
        "weight": 0.89,
        "severity": "mild",
        "priority": 1,
        "explanation": "Metabolic hypofunction triad of chronic fatigue, intolerance to cold ambient temperatures, and unexplained weight gain indicates hypothyroidism.",
        "source": "niddk",
        "source_url": "https://www.niddk.nih.gov/health-information/endocrine-diseases/hypothyroidism"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Type 2 Diabetes": {
    "id": "type2_diabetes",
    "disease_id": "type2_diabetes",
    "name": "Type 2 Diabetes",
    "description": "A chronic condition in which the body does not use insulin properly, leading to high blood sugar.",
    "category": "Endocrine",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "5A11",
    "icd11_title": "Type 2 diabetes mellitus",
    "icd10_codes": [
      "E11.9"
    ],
    "snomed_code": null,
    "aliases": [
      "diabetes",
      "diabetes mellitus",
      "high blood sugar",
      "type 2 diabetes"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.cdc.gov/diabetes/signs-symptoms/index.html",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "frequent_urination": 0.8,
      "excessive_thirst": 0.9,
      "weight_loss": 0.4,
      "blurred_vision": 0.5,
      "fatigue": 0.5,
      "numbness_tingling": 0.5,
      "slow_healing_sores": 0.6,
      "dry_skin": 0.3
    },
    "against": {},
    "typical_duration": [
      "1-4w",
      ">4w"
    ],
    "rules": [
      {
        "id": "R35",
        "disease_id": "type2_diabetes",
        "conditions": {
          "all": [
            "frequent_urination",
            "excessive_thirst"
          ]
        },
        "exclusions": [],
        "weight": 0.91,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Osmotic diuresis manifestations (polyuria and compensatory polydipsia) provide strong clinical indication of hyperglycemia / Diabetes Mellitus.",
        "source": "cdc",
        "source_url": "https://www.cdc.gov/diabetes/signs-symptoms/index.html"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Generalized Anxiety Disorder": {
    "id": "gad",
    "disease_id": "gad",
    "name": "Generalized Anxiety Disorder",
    "description": "Persistent and excessive worry about everyday matters that is hard to control.",
    "category": "Mental health",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "6B00",
    "icd11_title": "Generalised anxiety disorder",
    "icd10_codes": [
      "F41.1"
    ],
    "snomed_code": null,
    "aliases": [
      "anxiety disorder",
      "chronic anxiety",
      "gad",
      "generalized anxiety disorder"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.nimh.nih.gov/health/topics/generalized-anxiety-disorder-gad",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "anxiety_worry": 0.95,
      "restlessness": 0.8,
      "fatigue": 0.4,
      "poor_concentration": 0.6,
      "irritability": 0.6,
      "muscle_tension": 0.6,
      "sleep_problems": 0.6,
      "palpitations": 0.2
    },
    "against": {
      "fever": 0.3
    },
    "typical_duration": [
      ">4w"
    ],
    "rules": [
      {
        "id": "R36",
        "disease_id": "gad",
        "conditions": {
          "all": [
            "anxiety_worry",
            "restlessness",
            "muscle_tension"
          ]
        },
        "exclusions": [
          "fever"
        ],
        "weight": 0.9,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Pervasive chronic uncontrollable apprehension accompanied by psychomotor agitation and muscle tension reflects Generalized Anxiety Disorder.",
        "source": "nimh",
        "source_url": "https://www.nimh.nih.gov/health/topics/generalized-anxiety-disorder-gad"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  },
  "Depression (Major Depressive Disorder)": {
    "id": "depression",
    "disease_id": "depression",
    "name": "Depression (Major Depressive Disorder)",
    "description": "A common but serious mood disorder affecting how a person feels, thinks and handles daily activities.",
    "category": "Mental health",
    "severity": "moderate",
    "urgency": "Moderate",
    "icd11_code": "6A70",
    "icd11_title": "Single episode depressive disorder",
    "icd10_codes": [
      "F32.9"
    ],
    "snomed_code": null,
    "aliases": [
      "clinical depression",
      "depression",
      "depression (major depressive disorder)",
      "depressive disorder",
      "major depression"
    ],
    "source": "WHO ICD-11 / NLM Clinical Tables / MedlinePlus",
    "source_url": "https://www.nimh.nih.gov/health/topics/depression",
    "last_verified": "2026-10-08",
    "verification_status": "verified",
    "symptoms": {
      "persistent_sadness": 0.95,
      "loss_of_interest": 0.9,
      "fatigue": 0.6,
      "sleep_problems": 0.6,
      "poor_concentration": 0.5,
      "feelings_worthless": 0.7,
      "irritability": 0.4,
      "loss_of_appetite": 0.4,
      "weight_gain": 0.2,
      "weight_loss": 0.2
    },
    "against": {
      "fever": 0.3
    },
    "typical_duration": [
      "1-4w",
      ">4w"
    ],
    "rules": [
      {
        "id": "R37",
        "disease_id": "depression",
        "conditions": {
          "all": [
            "persistent_sadness",
            "loss_of_interest",
            "feelings_worthless"
          ]
        },
        "exclusions": [
          "fever"
        ],
        "weight": 0.94,
        "severity": "moderate",
        "priority": 1,
        "explanation": "Core DSM-5 / ICD criteria for major depression: persistent dysphoric mood, anhedonia (loss of pleasure), and feelings of worthlessness.",
        "source": "nimh",
        "source_url": "https://www.nimh.nih.gov/health/topics/depression"
      }
    ],
    "advice": "Consult a qualified physician for evaluation and personalized clinical management."
  }
};

window.RED_FLAGS_DATA = [
  {
    "id": "RF-01",
    "name": "Suspected Stroke / Acute Neurological Deficit",
    "severity": "emergency",
    "symptoms": [
      "face_drooping",
      "arm_leg_weakness",
      "speech_difficulty"
    ],
    "match_mode": "any",
    "emergency_message": "Immediate emergency attention required (FAST signs detected). Sudden facial drooping, one-sided weakness, or speech impairment may indicate an acute stroke.",
    "action": "Call emergency services (e.g. 911 / 999 / 112) immediately. Do not drive yourself.",
    "source": "cdc",
    "source_url": "https://www.cdc.gov/stroke/signs-symptoms/index.html"
  },
  {
    "id": "RF-02",
    "name": "Suspected Acute Coronary Syndrome (Heart Attack)",
    "severity": "emergency",
    "symptoms": [
      "chest_pain_radiating",
      "cold_sweat"
    ],
    "conditions": [
      {
        "any": [
          "chest_pain_radiating"
        ]
      },
      {
        "all": [
          "chest_pain",
          "cold_sweat"
        ]
      },
      {
        "all": [
          "chest_pain",
          "shortness_of_breath"
        ]
      }
    ],
    "match_mode": "condition_group",
    "emergency_message": "Possible acute cardiac event. Chest discomfort radiating to jaw, neck, back, or arm, especially with breathlessness or cold sweats, requires immediate evaluation.",
    "action": "Call emergency medical services immediately. Rest quietly while awaiting help.",
    "source": "nhlbi",
    "source_url": "https://www.nhlbi.nih.gov/health/heart-attack/symptoms"
  },
  {
    "id": "RF-03",
    "name": "Severe Respiratory Distress / Hypoxemia",
    "severity": "emergency",
    "symptoms": [
      "severe_breathing_difficulty",
      "bluish_lips"
    ],
    "match_mode": "any",
    "emergency_message": "Severe breathing difficulty, struggle to speak, or cyanosis (bluish lips/face) indicates critical respiratory compromise.",
    "action": "Seek immediate emergency medical care or call an ambulance immediately.",
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/breathingproblems.html"
  },
  {
    "id": "RF-04",
    "name": "Meningeal Irritation / Central Nervous System Infection",
    "severity": "emergency",
    "symptoms": [
      "stiff_neck",
      "high_fever",
      "confusion"
    ],
    "conditions": [
      {
        "all": [
          "stiff_neck",
          "high_fever"
        ]
      },
      {
        "all": [
          "stiff_neck",
          "confusion"
        ]
      },
      {
        "all": [
          "stiff_neck",
          "severe_headache",
          "light_sensitivity"
        ]
      }
    ],
    "match_mode": "condition_group",
    "emergency_message": "Combination of stiff neck with fever, confusion, or severe photophobia may indicate acute meningitis.",
    "action": "Go to the nearest emergency department immediately for urgent clinical examination.",
    "source": "cdc",
    "source_url": "https://www.cdc.gov/meningitis/signs-symptoms/index.html"
  },
  {
    "id": "RF-05",
    "name": "Thunderclap Headache (Intracranial Hemorrhage)",
    "severity": "emergency",
    "symptoms": [
      "thunderclap_headache"
    ],
    "match_mode": "any",
    "emergency_message": "Sudden, excruciating 'worst headache of life' peaking in seconds may suggest subarachnoid hemorrhage.",
    "action": "Seek immediate emergency room evaluation. Do not delay.",
    "source": "ninds",
    "source_url": "https://www.ninds.nih.gov/health-information/disorders/headache"
  },
  {
    "id": "RF-06",
    "name": "Gastrointestinal Bleeding",
    "severity": "urgent",
    "symptoms": [
      "vomiting_blood",
      "black_stools"
    ],
    "match_mode": "any",
    "emergency_message": "Vomiting blood (hematemesis) or black/tarry stools indicates potential active internal gastrointestinal bleeding.",
    "action": "Proceed to an emergency room or urgent clinical care immediately.",
    "source": "medlineplus",
    "source_url": "https://medlineplus.gov/gastrointestinalbleeding.html"
  },
  {
    "id": "RF-07",
    "name": "Suspected Acute Surgical Abdomen (e.g. Appendicitis/Peritonitis)",
    "severity": "urgent",
    "symptoms": [
      "right_lower_abdominal_pain",
      "severe_abdominal_pain"
    ],
    "conditions": [
      {
        "all": [
          "right_lower_abdominal_pain",
          "fever"
        ]
      },
      {
        "all": [
          "severe_abdominal_pain",
          "persistent_vomiting"
        ]
      }
    ],
    "match_mode": "condition_group",
    "emergency_message": "Severe localized abdominal pain with fever or persistent vomiting may signify an acute surgical condition requiring immediate physician assessment.",
    "action": "Seek urgent medical care without taking strong laxatives or pain relievers that may mask findings.",
    "source": "niddk",
    "source_url": "https://www.niddk.nih.gov/health-information/digestive-diseases/appendicitis/symptoms-causes"
  },
  {
    "id": "RF-08",
    "name": "Imminent Psychiatric Crisis / Suicidal Ideation",
    "severity": "emergency",
    "symptoms": [
      "suicidal_thoughts"
    ],
    "match_mode": "any",
    "emergency_message": "Suicidal ideation or self-harm thoughts represent an acute mental health crisis.",
    "action": "Contact 988 Suicide & Crisis Lifeline (US/Canada), 111 (UK), or your local crisis helpline / emergency department immediately. You are not alone.",
    "source": "nimh",
    "source_url": "https://www.nimh.nih.gov/health/topics/suicide-prevention"
  }
];

window.CLINICAL_QUESTIONS_DATA = [
  {
    "id": "CQ-01",
    "question": "How severe is your fever?",
    "symptom_trigger": "fever",
    "answer_type": "single_choice",
    "options": [
      {
        "id": "none",
        "label": "No fever (< 37.5\u00b0C / 99.5\u00b0F)",
        "maps_to_symptoms": [],
        "removes_symptoms": [
          "fever",
          "high_fever",
          "mild_fever"
        ]
      },
      {
        "id": "mild",
        "label": "Mild (37.5\u00b0C \u2013 38.0\u00b0C / 99.5\u00b0F \u2013 100.4\u00b0F)",
        "maps_to_symptoms": [
          "mild_fever",
          "fever"
        ],
        "removes_symptoms": [
          "high_fever"
        ]
      },
      {
        "id": "moderate",
        "label": "Moderate (38.0\u00b0C \u2013 39.0\u00b0C / 100.4\u00b0F \u2013 102.2\u00b0F)",
        "maps_to_symptoms": [
          "fever"
        ],
        "removes_symptoms": [
          "high_fever",
          "mild_fever"
        ]
      },
      {
        "id": "high",
        "label": "High (> 39.0\u00b0C / 102.2\u00b0F)",
        "maps_to_symptoms": [
          "high_fever",
          "fever"
        ],
        "removes_symptoms": [
          "mild_fever"
        ]
      }
    ],
    "relevance": "Differentiates mild viral upper respiratory illnesses from high-inflammatory viral syndromes or bacteremia."
  },
  {
    "id": "CQ-02",
    "question": "How long have you experienced these symptoms?",
    "symptom_trigger": "always",
    "answer_type": "single_choice",
    "options": [
      {
        "id": "<1d",
        "label": "Less than 24 hours (< 1 day)",
        "duration_bucket": "<1d"
      },
      {
        "id": "1-3d",
        "label": "1 to 3 days",
        "duration_bucket": "1-3d"
      },
      {
        "id": "3-7d",
        "label": "3 to 7 days",
        "duration_bucket": "3-7d"
      },
      {
        "id": "1-4w",
        "label": "1 to 4 weeks",
        "duration_bucket": "1-4w"
      },
      {
        "id": ">4w",
        "label": "More than 4 weeks (Chronic)",
        "duration_bucket": ">4w"
      }
    ],
    "relevance": "Crucial temporal marker to distinguish acute infections from subacute or chronic diseases (e.g. COPD, IBS, Hypothyroidism)."
  },
  {
    "id": "CQ-03",
    "question": "What does your cough feel like?",
    "symptom_trigger": "cough",
    "answer_type": "single_choice",
    "options": [
      {
        "id": "dry",
        "label": "Dry, tickly, non-productive",
        "maps_to_symptoms": [
          "dry_cough"
        ],
        "removes_symptoms": [
          "productive_cough"
        ]
      },
      {
        "id": "productive",
        "label": "Chesty, producing phlegm or mucus",
        "maps_to_symptoms": [
          "productive_cough"
        ],
        "removes_symptoms": [
          "dry_cough"
        ]
      },
      {
        "id": "blood",
        "label": "Contains streaks of blood or rust colored",
        "maps_to_symptoms": [
          "coughing_blood",
          "productive_cough"
        ],
        "removes_symptoms": []
      }
    ],
    "relevance": "Distinguishes upper viral cough/asthma from lower airway alveolar exudative processes (pneumonia, bronchitis) and red-flag hemoptysis."
  },
  {
    "id": "CQ-04",
    "question": "Have you had any known exposure or travel?",
    "symptom_trigger": "always",
    "answer_type": "multi_choice",
    "options": [
      {
        "id": "sick_contact",
        "label": "Close contact with someone who has flu/COVID or similar illness",
        "risk_factor": "sick_contact"
      },
      {
        "id": "tropical_travel",
        "label": "Recent travel to tropical / mosquito-prone regions (within 2 weeks)",
        "risk_factor": "tropical_travel"
      },
      {
        "id": "none",
        "label": "None of the above",
        "risk_factor": null
      }
    ],
    "relevance": "Increases epidemiological prior probability for specific vector-borne or airborne infections."
  }
];

window.SOURCES_DATA = [
  {
    "id": "nlm_ct_conditions",
    "name": "NLM Clinical Tables - Medical Conditions",
    "url": "https://clinicaltables.nlm.nih.gov/apidoc/conditions/v3/doc.html",
    "publisher": "U.S. National Library of Medicine",
    "kind": "terminology",
    "license_note": "Public API provided by NLM. Condition list with ICD-10-CM mappings, synonyms and MedlinePlus links.",
    "integration": "imported"
  },
  {
    "id": "nlm_ct_icd11",
    "name": "WHO ICD-11 (via NLM Clinical Tables ICD-11 API)",
    "url": "https://clinicaltables.nlm.nih.gov/apidoc/icd11_codes/v3/doc.html",
    "publisher": "World Health Organization / U.S. National Library of Medicine",
    "kind": "terminology",
    "license_note": "ICD-11 content (c) WHO, licensed CC BY-ND 3.0 IGO. Codes and titles are stored unmodified.",
    "integration": "imported"
  },
  {
    "id": "medlineplus",
    "name": "MedlinePlus",
    "url": "https://medlineplus.gov/",
    "publisher": "U.S. National Library of Medicine",
    "kind": "patient_information",
    "license_note": "Linked as reference only. Page text is not copied into the knowledge base.",
    "integration": "referenced"
  },
  {
    "id": "cdc",
    "name": "U.S. Centers for Disease Control and Prevention",
    "url": "https://www.cdc.gov/",
    "publisher": "CDC",
    "kind": "clinical_reference",
    "license_note": "Linked as reference only.",
    "integration": "referenced"
  },
  {
    "id": "who_factsheets",
    "name": "WHO Fact Sheets",
    "url": "https://www.who.int/news-room/fact-sheets",
    "publisher": "World Health Organization",
    "kind": "clinical_reference",
    "license_note": "Linked as reference only.",
    "integration": "referenced"
  },
  {
    "id": "niddk",
    "name": "NIH - National Institute of Diabetes and Digestive and Kidney Diseases",
    "url": "https://www.niddk.nih.gov/health-information",
    "publisher": "NIH / NIDDK",
    "kind": "clinical_reference",
    "license_note": "Linked as reference only.",
    "integration": "referenced"
  },
  {
    "id": "nhlbi",
    "name": "NIH - National Heart, Lung, and Blood Institute",
    "url": "https://www.nhlbi.nih.gov/health",
    "publisher": "NIH / NHLBI",
    "kind": "clinical_reference",
    "license_note": "Linked as reference only.",
    "integration": "referenced"
  },
  {
    "id": "nimh",
    "name": "NIH - National Institute of Mental Health",
    "url": "https://www.nimh.nih.gov/health/topics",
    "publisher": "NIH / NIMH",
    "kind": "clinical_reference",
    "license_note": "Linked as reference only.",
    "integration": "referenced"
  },
  {
    "id": "ninds",
    "name": "NIH - National Institute of Neurological Disorders and Stroke",
    "url": "https://www.ninds.nih.gov/health-information/disorders",
    "publisher": "NIH / NINDS",
    "kind": "clinical_reference",
    "license_note": "Linked as reference only.",
    "integration": "referenced"
  },
  {
    "id": "medexpert_curated",
    "name": "MedExpert curation (heuristic weights)",
    "url": "",
    "publisher": "MedExpert project",
    "kind": "curation",
    "license_note": "Association strengths, rule weights and rule structure are curator-assigned heuristics. They are NOT derived from published likelihood ratios and are flagged as such.",
    "integration": "internal"
  },
  {
    "id": "snomed_ct",
    "name": "SNOMED CT",
    "url": "https://www.snomed.org/",
    "publisher": "SNOMED International",
    "kind": "terminology",
    "license_note": "Requires an affiliate/national licence. NOT integrated. Schema provides snomed_code columns for future use.",
    "integration": "not_integrated"
  },
  {
    "id": "mimic_iv_ext_cds",
    "name": "MIMIC-IV-Ext CDS",
    "url": "https://physionet.org/",
    "publisher": "PhysioNet",
    "kind": "research_dataset",
    "license_note": "Credentialed access required. NOT used by the production system or by the bundled evaluation.",
    "integration": "not_integrated"
  }
];
