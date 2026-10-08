/**
 * MedExpert Application Controller & UI State Machine
 * Faithful implementation of all 9 reference screens.
 */

// Application State
const AppState = {
  currentView: "landing", // landing | wizard-1 | wizard-2 | wizard-3 | wizard-processing | wizard-4 | reasoning | dashboard | kb
  wizardStep: 1,
  
  patient: {
    id: "P-1024",
    age: 20,
    gender: "Male",
    conditions: "None reported",
    allergies: "None reported",
    medications: "None"
  },
  
  selectedSymptoms: ["fever", "headache", "fatigue"], // Default pre-selected matching reference screen 3
  
  clinicalAnswers: {
    feverSeverity: "high", // mild | moderate | high
    duration: "1 - 3 days", // < 1 day | 1 - 3 days | 3 - 7 days | > 7 days
    breathingDifficulty: "No",
    severeOnset: "Yes"
  },
  
  lastEvaluation: null,

  // Historical Assessments (Preloaded with Screen 8 data + local storage persistence)
  assessments: [
    { id: "P-1024", ageGender: "20 / Male", symptoms: ["Fever", "Headache", "Fatigue"], result: "Influenza", confidence: 82, date: "08 Oct 2026", urgency: "Moderate" },
    { id: "P-1023", ageGender: "25 / Female", symptoms: ["Cough", "Sore throat"], result: "Common Cold", confidence: 68, date: "07 Oct 2026", urgency: "Low" },
    { id: "P-1022", ageGender: "32 / Male", symptoms: ["Stomach pain", "Nausea"], result: "Gastritis", confidence: 74, date: "06 Oct 2026", urgency: "Moderate" },
    { id: "P-1021", ageGender: "28 / Female", symptoms: ["Headache", "Dizziness"], result: "Migraine", confidence: 71, date: "05 Oct 2026", urgency: "Moderate" },
    { id: "P-1020", ageGender: "40 / Male", symptoms: ["Chest pain", "Shortness of breath"], result: "Respiratory Infection", confidence: 63, date: "04 Oct 2026", urgency: "High" }
  ]
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadSavedHistory();
  initViewRouting();
  initWizard();
  renderSymptomCards();
  initClinicalQuestions();
  renderDashboard();
  renderKnowledgeBase();
});

function loadSavedHistory() {
  const saved = localStorage.getItem("medexpert_assessments");
  if (saved) {
    try {
      AppState.assessments = JSON.parse(saved);
    } catch (e) {
      console.warn("Could not parse saved history:", e);
    }
  }
}

function saveHistory() {
  localStorage.setItem("medexpert_assessments", JSON.stringify(AppState.assessments));
}

// ==============================================================================
// VIEW ROUTING & NAVIGATION
// ==============================================================================
function switchView(viewName) {
  AppState.currentView = viewName;

  // Toggle Landing View vs App Workspace
  const landingEl = document.getElementById("view-landing");
  const appWorkspaceEl = document.getElementById("view-app-workspace");

  if (viewName === "landing") {
    landingEl.style.display = "flex";
    appWorkspaceEl.style.display = "none";
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  landingEl.style.display = "none";
  appWorkspaceEl.style.display = "flex";

  // Hide all inner workspace sub-views
  const subviews = [
    "subview-wizard-1",
    "subview-wizard-2",
    "subview-wizard-3",
    "subview-wizard-processing",
    "subview-wizard-4",
    "subview-reasoning",
    "subview-dashboard",
    "subview-kb"
  ];

  subviews.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  // Activate requested view
  const targetId = `subview-${viewName}`;
  const targetEl = document.getElementById(targetId);
  if (targetEl) targetEl.style.display = "block";

  // Update Sidebar active state
  updateSidebarActive(viewName);

  // Sync Wizard stepper visibility
  const stepperContainer = document.getElementById("wizard-stepper-bar");
  if (viewName.startsWith("wizard-") && viewName !== "wizard-processing") {
    stepperContainer.style.display = "flex";
    const stepNum = parseInt(viewName.replace("wizard-", ""), 10);
    updateWizardStepper(stepNum);
  } else {
    stepperContainer.style.display = "none";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateSidebarActive(viewName) {
  document.querySelectorAll(".sidebar-nav-item").forEach(item => {
    item.classList.remove("active");
  });

  let matchTarget = "";
  if (viewName.startsWith("wizard-")) matchTarget = "nav-assessment";
  else if (viewName === "dashboard") matchTarget = "nav-dashboard";
  else if (viewName === "kb") matchTarget = "nav-kb";
  else if (viewName === "reasoning") matchTarget = "nav-rules";

  const activeBtn = document.querySelector(`[data-nav="${matchTarget}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}

function initViewRouting() {
  // Brand Logo Click -> Landing
  document.getElementById("btn-brand-home").addEventListener("click", () => switchView("landing"));
  document.getElementById("btn-nav-home").addEventListener("click", () => switchView("landing"));

  // Landing "Get Started" & "Start Assessment"
  document.getElementById("btn-landing-get-started").addEventListener("click", () => startNewAssessment());
  document.getElementById("btn-hero-start").addEventListener("click", () => startNewAssessment());

  // Sidebar "+ New Assessment"
  document.getElementById("btn-sidebar-new").addEventListener("click", () => startNewAssessment());

  // Sidebar Menu Clicks
  document.getElementById("btn-nav-dashboard").addEventListener("click", () => {
    renderDashboard();
    switchView("dashboard");
  });

  document.getElementById("btn-nav-history").addEventListener("click", () => {
    renderDashboard();
    switchView("dashboard");
  });

  document.getElementById("btn-nav-kb").addEventListener("click", () => {
    renderKnowledgeBase();
    switchView("kb");
  });

  document.getElementById("btn-nav-rules").addEventListener("click", () => {
    if (!AppState.lastEvaluation) {
      runInferenceEvaluation();
    }
    renderReasoningView();
    switchView("reasoning");
  });
}

function startNewAssessment() {
  // Generate next patient ID
  const nextNum = 1024 + AppState.assessments.length;
  AppState.patient.id = `P-${nextNum}`;
  document.getElementById("input-patient-id").value = AppState.patient.id;
  
  // Reset selected symptoms if needed, or keep defaults
  updateSelectedPillTray();
  switchView("wizard-1");
}

// ==============================================================================
// WIZARD CONTROLLER (STEPS 1 - 4)
// ==============================================================================
function initWizard() {
  // Step 1: Gender Radio Pills
  document.querySelectorAll(".gender-pill-label").forEach(pill => {
    pill.addEventListener("click", (e) => {
      document.querySelectorAll(".gender-pill-label").forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
      AppState.patient.gender = pill.getAttribute("data-gender");
    });
  });

  // Step 1 -> Step 2
  document.getElementById("btn-step1-next").addEventListener("click", () => {
    AppState.patient.id = document.getElementById("input-patient-id").value.trim() || `P-${Math.floor(1000 + Math.random() * 9000)}`;
    AppState.patient.age = parseInt(document.getElementById("input-patient-age").value, 10) || 20;
    AppState.patient.conditions = document.getElementById("input-patient-conditions").value.trim() || "None reported";
    AppState.patient.allergies = document.getElementById("input-patient-allergies").value.trim() || "None reported";
    AppState.patient.medications = document.getElementById("input-patient-meds").value.trim() || "None";
    
    switchView("wizard-2");
  });

  // Step 2: Back & Next
  document.getElementById("btn-step2-back").addEventListener("click", () => switchView("wizard-1"));
  document.getElementById("btn-step2-next").addEventListener("click", () => {
    if (AppState.selectedSymptoms.length === 0) {
      alert("Please select at least one symptom to proceed with the assessment.");
      return;
    }
    switchView("wizard-3");
  });

  // Step 3: Back & Run Analysis
  document.getElementById("btn-step3-back").addEventListener("click", () => switchView("wizard-2"));
  document.getElementById("btn-step3-next").addEventListener("click", () => {
    triggerProcessingScreen();
  });

  // Step 4: Results Actions
  document.getElementById("btn-step4-back").addEventListener("click", () => switchView("wizard-3"));
  document.getElementById("btn-step4-reasoning").addEventListener("click", () => {
    renderReasoningView();
    switchView("reasoning");
  });

  // Reasoning Back button
  document.getElementById("btn-reasoning-back").addEventListener("click", () => switchView("wizard-4"));
  document.getElementById("btn-reasoning-print").addEventListener("click", () => window.print());
}

function updateWizardStepper(activeStep) {
  AppState.wizardStep = activeStep;
  const items = document.querySelectorAll(".wizard-step-item");
  const fill = document.getElementById("wizard-connector-fill");

  const progressPercent = ((activeStep - 1) / (items.length - 1)) * 100;
  fill.style.width = `${progressPercent}%`;

  items.forEach((item, index) => {
    const stepNum = index + 1;
    item.classList.remove("active", "completed");

    if (stepNum === activeStep) {
      item.classList.add("active");
    } else if (stepNum < activeStep) {
      item.classList.add("completed");
    }
  });
}

// ==============================================================================
// STEP 2: SYMPTOM SELECTION GRID & SEARCH
// ==============================================================================
function renderSymptomCards(filterCategory = "All", searchQuery = "") {
  const container = document.getElementById("symptom-cards-container");
  container.innerHTML = "";

  const query = searchQuery.toLowerCase().trim();

  const filtered = window.SYMPTOMS_DATA.filter(item => {
    const matchesCategory = (filterCategory === "All" || item.category === filterCategory);
    if (!matchesCategory) return false;
    if (!query) return true;

    const labelMatch = item.label.toLowerCase().includes(query);
    const idMatch = item.id.toLowerCase().includes(query);
    const aliasMatch = (item.aliases || []).some(a => a.toLowerCase().includes(query));
    
    // Prefix / fuzzy match for common typos (e.g., "feaver" -> "fever")
    const fuzzyPrefix = query.length >= 4 && (
      item.label.toLowerCase().startsWith(query.slice(0, 3)) ||
      (item.aliases || []).some(a => a.toLowerCase().startsWith(query.slice(0, 3)))
    );

    return labelMatch || idMatch || aliasMatch || fuzzyPrefix;
  });

  filtered.forEach(symptom => {
    const isSelected = AppState.selectedSymptoms.includes(symptom.id);
    const card = document.createElement("div");
    card.className = `symptom-card-item ${isSelected ? "selected" : ""}`;
    card.setAttribute("data-id", symptom.id);

    card.innerHTML = `
      <div class="symptom-icon-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      </div>
      <span class="symptom-card-label">${symptom.label}</span>
    `;

    card.addEventListener("click", () => toggleSymptomSelection(symptom.id, card));
    container.appendChild(card);
  });

  updateSelectedPillTray();
}

function toggleSymptomSelection(symptomId, cardElement) {
  const idx = AppState.selectedSymptoms.indexOf(symptomId);
  if (idx > -1) {
    AppState.selectedSymptoms.splice(idx, 1);
    cardElement.classList.remove("selected");
  } else {
    AppState.selectedSymptoms.push(symptomId);
    cardElement.classList.add("selected");
  }
  updateSelectedPillTray();
}

function updateSelectedPillTray() {
  const countLabel = document.getElementById("selected-symptoms-count");
  const pillsContainer = document.getElementById("selected-pills-container");

  countLabel.textContent = `Selected Symptoms (${AppState.selectedSymptoms.length})`;
  pillsContainer.innerHTML = "";

  if (AppState.selectedSymptoms.length === 0) {
    pillsContainer.innerHTML = `<span style="font-size: 13px; color: #94a3b8; font-style: italic;">No symptoms selected yet. Click any symptom above to select.</span>`;
    return;
  }

  AppState.selectedSymptoms.forEach(symId => {
    const symObj = window.SYMPTOMS_DATA.find(s => s.id === symId);
    const label = symObj ? symObj.label : symId;

    const pill = document.createElement("span");
    pill.className = "selected-pill";
    pill.innerHTML = `
      ${label}
      <span class="btn-remove-pill" title="Remove">&times;</span>
    `;

    pill.querySelector(".btn-remove-pill").addEventListener("click", (e) => {
      e.stopPropagation();
      AppState.selectedSymptoms = AppState.selectedSymptoms.filter(s => s !== symId);
      // Re-render
      renderSymptomCards(
        document.querySelector(".category-tab-btn.active").getAttribute("data-cat"),
        document.getElementById("input-symptom-search").value
      );
    });

    pillsContainer.appendChild(pill);
  });
}

// Symptom Filter Tabs & Search wiring
document.querySelectorAll(".category-tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".category-tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderSymptomCards(
      btn.getAttribute("data-cat"),
      document.getElementById("input-symptom-search").value
    );
  });
});

document.getElementById("input-symptom-search").addEventListener("input", (e) => {
  const activeCat = document.querySelector(".category-tab-btn.active").getAttribute("data-cat");
  renderSymptomCards(activeCat, e.target.value);
});

// ==============================================================================
// STEP 3: CLINICAL QUESTIONS
// ==============================================================================
function initClinicalQuestions() {
  // Question 1: Fever Severity
  document.querySelectorAll("[data-q='fever-sev']").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll("[data-q='fever-sev']").forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");
      AppState.clinicalAnswers.feverSeverity = item.getAttribute("data-val");
    });
  });

  // Question 2: Duration
  document.querySelectorAll("[data-q='duration']").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll("[data-q='duration']").forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");
      AppState.clinicalAnswers.duration = item.getAttribute("data-val");
    });
  });
}

// ==============================================================================
// STEP 4: PROCESSING SCREEN -> RESULTS
// ==============================================================================
function triggerProcessingScreen() {
  switchView("wizard-processing");

  const checklistItems = [
    document.getElementById("proc-check-1"),
    document.getElementById("proc-check-2"),
    document.getElementById("proc-check-3"),
    document.getElementById("proc-check-4")
  ];

  // Reset checklist
  checklistItems.forEach(el => {
    el.classList.remove("completed", "active");
    el.querySelector(".check-badge").innerHTML = "&bull;";
  });

  // Progressive animation
  checklistItems[0].classList.add("active");

  setTimeout(() => {
    checklistItems[0].classList.add("completed");
    checklistItems[0].querySelector(".check-badge").innerHTML = "&#10003;";
    checklistItems[1].classList.add("active");
  }, 400);

  setTimeout(() => {
    checklistItems[1].classList.add("completed");
    checklistItems[1].querySelector(".check-badge").innerHTML = "&#10003;";
    checklistItems[2].classList.add("active");
  }, 900);

  setTimeout(() => {
    checklistItems[2].classList.add("completed");
    checklistItems[2].querySelector(".check-badge").innerHTML = "&#10003;";
    checklistItems[3].classList.add("active");
  }, 1400);

  setTimeout(() => {
    checklistItems[3].classList.add("completed");
    checklistItems[3].querySelector(".check-badge").innerHTML = "&#10003;";

    // Run forward chaining engine
    runInferenceEvaluation();
    renderResultsView();
    switchView("wizard-4");
  }, 1900);
}

function runInferenceEvaluation() {
  const evalResult = window.ExpertEngine.evaluate(
    AppState.patient,
    AppState.selectedSymptoms,
    AppState.clinicalAnswers
  );

  AppState.lastEvaluation = evalResult;

  // Add to assessment history
  if (evalResult.topResult) {
    const newRecord = {
      id: AppState.patient.id,
      ageGender: `${AppState.patient.age} / ${AppState.patient.gender}`,
      symptoms: AppState.selectedSymptoms.map(s => {
        const found = window.SYMPTOMS_DATA.find(x => x.id === s);
        return found ? found.label : s;
      }),
      result: evalResult.topResult.disease,
      confidence: evalResult.topResult.confidence,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      urgency: evalResult.topResult.urgency
    };

    // Prepend to list
    AppState.assessments.unshift(newRecord);
    saveHistory();
  }
}

// ==============================================================================
// STEP 4: DIAGNOSIS RESULTS RENDERING
// ==============================================================================
function renderResultsView() {
  const data = AppState.lastEvaluation;
  if (!data || !data.topResult) return;

  const top = data.topResult;

  // Header timestamp
  document.getElementById("results-timestamp").textContent = `Generated on ${data.timestamp} • ICD-11 Terminology & Expert KBS`;

  // Red Flag Alert Handling
  const rfBanner = document.getElementById("red-flag-alert-banner");
  const rfBody = document.getElementById("red-flag-details-body");
  if (data.hasRedFlags && data.redFlags && data.redFlags.length > 0) {
    rfBanner.style.display = "block";
    rfBody.innerHTML = data.redFlags.map(rf => `
      <div style="margin-bottom: 12px; padding: 10px; background: rgba(254, 226, 226, 0.6); border-radius: 8px;">
        <strong style="display: block; font-size: 15px; margin-bottom: 4px;">${rf.name} (Severity: ${rf.severity.toUpperCase()})</strong>
        <p style="margin-bottom: 6px;">${rf.emergencyMessage}</p>
        <div style="font-weight: 700; color: #7f1d1d;">Immediate Recommended Action: ${rf.action}</div>
        ${rf.sourceUrl ? `<a href="${rf.sourceUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; color: #b91c1c; text-decoration: underline; margin-top: 4px; display: inline-block;">Clinical Reference (${rf.source.toUpperCase()})</a>` : ''}
      </div>
    `).join("");
  } else {
    rfBanner.style.display = "none";
  }

  // Lead condition card
  document.getElementById("lead-condition-name").textContent = top.disease;
  document.getElementById("lead-condition-cat").innerHTML = `
    <span>${top.category}</span> &bull; 
    <span>Urgency: <strong>${top.urgency}</strong></span> &bull; 
    <span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 12px; font-weight: 700; font-size: 12px;">ICD-11: ${top.icd11_code || 'CA40'}</span>
  `;
  document.getElementById("confidence-val-text").textContent = `${top.confidence}%`;
  document.getElementById("confidence-bar-fill").style.width = `${top.confidence}%`;

  // Differentials
  const diffsContainer = document.getElementById("differentials-list-container");
  diffsContainer.innerHTML = "";

  data.differentials.forEach(diff => {
    const item = document.createElement("div");
    item.className = "diff-stat-item";
    item.innerHTML = `
      <div class="diff-stat-header">
        <div>
          <span>${diff.disease}</span>
          <span style="font-size: 11px; color: #64748b; margin-left: 6px;">[${diff.icd11_code || 'ICD-11'}]</span>
        </div>
        <span style="color: var(--primary); font-weight: 700;">${diff.confidence}%</span>
      </div>
      <div class="diff-stat-bar-track">
        <div class="diff-stat-bar-fill" style="width: ${diff.confidence}%;"></div>
      </div>
    `;
    diffsContainer.appendChild(item);
  });

  // Supporting findings table
  const findingsContainer = document.getElementById("findings-table-body");
  findingsContainer.innerHTML = "";

  top.matchedSymptoms.forEach(symKey => {
    const symObj = window.SYMPTOMS_DATA.find(s => s.id === symKey);
    const label = symObj ? symObj.label : symKey;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="font-weight: 600;">${label}</td>
      <td>
        <span class="status-pill-supports">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Supports Primary Evidence
        </span>
      </td>
    `;
    findingsContainer.appendChild(row);
  });
}

// ==============================================================================
// VIEW 7: EXPLANATION OF REASONING
// ==============================================================================
function renderReasoningView() {
  const data = AppState.lastEvaluation;
  if (!data || !data.topResult) return;

  const top = data.topResult;

  // Render Rule Matching Code Blocks
  const ruleBoxContainer = document.getElementById("reasoning-rules-container");
  ruleBoxContainer.innerHTML = "";

  const activatedRules = top.rules || [];
  if (activatedRules.length === 0) {
    ruleBoxContainer.innerHTML = `
      <div style="padding: 16px; background: #f8fafc; border-radius: 8px; color: #64748b; font-size: 13.5px;">
        Evidence aggregated via weighted symptomatic profile associations. Specific production rule thresholds were partially satisfied.
      </div>
    `;
  } else {
    activatedRules.forEach(r => {
      const box = document.createElement("div");
      box.className = "rule-box-item";
      box.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div class="rule-id-badge">&#9679; Rule ${r.ruleId || 'R'} (Target: ${r.disease})</div>
          <span style="font-size: 12px; font-weight: 700; color: #0369a1;">Weight: ${r.weight}</span>
        </div>
        <div class="rule-code-snippet" style="margin-bottom: 8px;">
          IF [${(r.matchedSymptoms || []).join(" AND ")}] THEN Likelihood(${r.disease}) += ${(r.weight * 15).toFixed(0)} pts
        </div>
        <p style="font-size: 12.5px; color: #334155; line-height: 1.5; margin-bottom: 6px;">
          ${r.explanation}
        </p>
        ${r.sourceUrl ? `<a href="${r.sourceUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 11.5px; color: var(--primary); text-decoration: underline;">Clinical Source: ${r.source ? r.source.toUpperCase() : 'CDC/WHO'}</a>` : ''}
      `;
      ruleBoxContainer.appendChild(box);
    });
  }

  // Render Visual Inference Flow
  const flowContainer = document.getElementById("inference-flow-diagram");
  const symptomsStr = top.matchedSymptoms.map(s => {
    const found = window.SYMPTOMS_DATA.find(x => x.id === s);
    return found ? found.label : s;
  }).join(", ");

  flowContainer.innerHTML = `
    <div class="flow-node">
      <div class="flow-node-title">Patient Symptoms</div>
      <div class="flow-node-sub">${symptomsStr}</div>
    </div>
    <div class="flow-arrow-down"></div>
    <div class="flow-node">
      <div class="flow-node-title">Deterministic Rule Engine</div>
      <div class="flow-node-sub">${data.totalRulesActivated} clinical rules activated</div>
    </div>
    <div class="flow-arrow-down"></div>
    <div class="flow-node">
      <div class="flow-node-title">Evidence Aggregation</div>
      <div class="flow-node-sub">Weighted confidence: ${top.matchedWeight} / ${top.totalWeight} pts</div>
    </div>
    <div class="flow-arrow-down"></div>
    <div class="flow-node flow-node-lead">
      <div class="flow-node-title" style="color: #065f46;">Preliminary Assessment</div>
      <div class="flow-node-sub" style="font-weight: 800; color: #047857; font-size: 14px;">${top.disease} (${top.confidence}%)</div>
      <div style="font-size: 11px; color: #059669; margin-top: 4px;">ICD-11: ${top.icd11_code || 'CA40'}</div>
    </div>
  `;
}

// ==============================================================================
// VIEW 8: DASHBOARD & RECENT ASSESSMENTS
// ==============================================================================
function renderDashboard() {
  document.getElementById("stat-total-assessments").textContent = AppState.assessments.length;
  
  const kbDiseases = Object.keys(window.KNOWLEDGE_BASE || {}).length;
  document.getElementById("stat-kb-diseases").textContent = kbDiseases;
  
  let totalRules = 0;
  Object.values(window.KNOWLEDGE_BASE || {}).forEach(d => {
    if (d.rules) totalRules += d.rules.length;
  });
  document.getElementById("stat-total-rules").textContent = totalRules;

  const tableBody = document.getElementById("dashboard-history-body");
  tableBody.innerHTML = "";

  AppState.assessments.slice(0, 8).forEach(rec => {
    const row = document.createElement("tr");
    const symps = Array.isArray(rec.symptoms) ? rec.symptoms.join(", ") : rec.symptoms;

    row.innerHTML = `
      <td style="font-weight: 700; color: var(--primary);">${rec.id}</td>
      <td>${rec.ageGender}</td>
      <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${symps}</td>
      <td style="font-weight: 700; color: #0f172a;">${rec.result}</td>
      <td><span style="font-weight: 700; color: #059669;">${rec.confidence}%</span></td>
      <td style="color: var(--text-muted);">${rec.date}</td>
      <td><button class="btn-view-action" data-id="${rec.id}">View Report</button></td>
    `;

    row.querySelector(".btn-view-action").addEventListener("click", () => {
      // Load assessment for review
      alert(`Assessment Record [${rec.id}]\nPatient: ${rec.ageGender}\nResult: ${rec.result} (${rec.confidence}%)\nDate: ${rec.date}`);
    });

    tableBody.appendChild(row);
  });
}

// ==============================================================================
// VIEW 9: KNOWLEDGE BASE / RULES MANAGER
// ==============================================================================
function renderKnowledgeBase() {
  const tableBody = document.getElementById("kb-diseases-table-body");
  tableBody.innerHTML = "";

  Object.entries(window.KNOWLEDGE_BASE || {}).forEach(([name, data]) => {
    const row = document.createElement("tr");
    const commonSyms = Object.keys(data.symptoms || {}).map(s => {
      const found = (window.SYMPTOMS_DATA || []).find(x => x.id === s);
      return found ? found.label : s;
    }).slice(0, 4).join(", ");

    row.innerHTML = `
      <td>
        <strong style="color: #0f172a; display: block;">${name}</strong>
        <span style="font-size: 11px; background: #e0f2fe; color: #0284c7; padding: 1px 6px; border-radius: 4px; font-weight: 700;">
          ICD-11: ${data.icd11_code || 'CA40'}
        </span>
      </td>
      <td style="color: var(--text-secondary); font-size: 13.5px;">${data.description || data.category}</td>
      <td style="color: var(--text-muted); font-size: 13px;">${commonSyms}</td>
      <td>
        <span style="font-size: 12px; background: #ecfdf5; color: #059669; font-weight: 700; padding: 2px 8px; border-radius: 12px; display: inline-block; margin-bottom: 4px;">Verified</span>
        <button class="btn-view-action" style="color: var(--text-muted); display: block;" onclick="alert('Disease: ${name}\\nICD-11 Code: ${data.icd11_code}\\nCategory: ${data.category}\\nAssociated Rules: ${(data.rules || []).length}\\nSource: ${data.source}');">
          Rules (${(data.rules || []).length})
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}
