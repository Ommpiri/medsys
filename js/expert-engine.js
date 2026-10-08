/**
 * MedExpert Clinical Decision Support System - Upgraded Forward-Chaining Engine
 * Deterministic forward-chaining rule engine, safety-first red flag triage,
 * differential assessment, and full explainable inference trace generation.
 */

class ExpertSystemEngine {
  constructor() {
    this.kb = window.KNOWLEDGE_BASE || {};
    this.symptoms = window.SYMPTOMS_DATA || [];
    this.redFlags = window.RED_FLAGS_DATA || [];
    this.questions = window.CLINICAL_QUESTIONS_DATA || [];
  }

  evaluateRedFlags(reportedSymptomIds) {
    const symSet = new Set(reportedSymptomIds);
    const triggered = [];

    (this.redFlags || []).forEach(rf => {
      const mode = rf.match_mode || "any";
      let matched = false;
      const matchedSymptoms = [];

      if (mode === "any") {
        (rf.symptoms || []).forEach(s => {
          if (symSet.has(s)) {
            matched = true;
            matchedSymptoms.push(s);
          }
        });
      } else if (mode === "condition_group") {
        (rf.conditions || []).forEach(group => {
          if (group.any && group.any.some(s => symSet.has(s))) {
            matched = true;
            matchedSymptoms.push(...group.any.filter(s => symSet.has(s)));
          }
          if (group.all && group.all.every(s => symSet.has(s))) {
            matched = true;
            matchedSymptoms.push(...group.all);
          }
        });
      }

      if (matched) {
        triggered.push({
          id: rf.id,
          name: rf.name,
          severity: rf.severity,
          matchedSymptoms: Array.from(new Set(matchedSymptoms)),
          emergencyMessage: rf.emergency_message,
          action: rf.action,
          source: rf.source,
          sourceUrl: rf.source_url
        });
      }
    });

    return triggered;
  }

  evaluate(patientData, selectedSymptomIds, clinicalAnswers = {}) {
    const activeSymptoms = new Set(selectedSymptomIds);

    // Expand hierarchical parent symptoms
    this.symptoms.forEach(s => {
      if (activeSymptoms.has(s.id) && s.parent) {
        activeSymptoms.add(s.parent);
      }
    });

    // Apply clinical question refinements
    if (clinicalAnswers.feverSeverity === "high") {
      activeSymptoms.add("high_fever");
      activeSymptoms.add("fever");
    } else if (clinicalAnswers.feverSeverity === "mild") {
      activeSymptoms.add("mild_fever");
      activeSymptoms.add("fever");
    } else if (clinicalAnswers.feverSeverity === "none") {
      activeSymptoms.delete("fever");
      activeSymptoms.delete("high_fever");
      activeSymptoms.delete("mild_fever");
    }

    if (clinicalAnswers.coughType === "productive") {
      activeSymptoms.add("productive_cough");
    } else if (clinicalAnswers.coughType === "dry") {
      activeSymptoms.add("dry_cough");
    }

    // Safety-first Red Flag Check
    const triggeredRedFlags = this.evaluateRedFlags(Array.from(activeSymptoms));

    // Forward Chaining Rules Evaluation
    const activatedRules = [];
    const ruleBoosts = {};

    Object.entries(this.kb).forEach(([diseaseName, data]) => {
      (data.rules || []).forEach(rule => {
        const conds = rule.conditions || {};
        const exclusions = rule.exclusions || [];

        if (exclusions.some(ex => activeSymptoms.has(ex))) {
          return;
        }

        let matches = true;
        const matchedConditions = [];

        if (conds.all) {
          if (conds.all.every(c => activeSymptoms.has(c))) {
            matchedConditions.push(...conds.all);
          } else {
            matches = false;
          }
        }

        if (conds.any && matches) {
          const m = conds.any.filter(c => activeSymptoms.has(c));
          if (m.length > 0) {
            matchedConditions.push(...m);
          } else {
            matches = false;
          }
        }

        if (matches && matchedConditions.length > 0) {
          const did = data.id || diseaseName;
          ruleBoosts[did] = (ruleBoosts[did] || 0) + ((rule.weight || 0.5) * 15.0);
          activatedRules.push({
            ruleId: rule.id,
            disease: diseaseName,
            diseaseId: did,
            weight: rule.weight,
            matchedSymptoms: matchedConditions,
            explanation: rule.explanation || "Diagnostic rule activated based on symptomatic evidence.",
            source: rule.source,
            sourceUrl: rule.source_url
          });
        }
      });
    });

    // Score all diseases in Knowledge Base
    const results = [];
    const patientGender = (patientData.gender || "any").toLowerCase();
    const duration = clinicalAnswers.duration || "1-3d";

    Object.entries(this.kb).forEach(([diseaseName, data]) => {
      const symWeights = data.symptoms || {};
      const againstWeights = data.against || {};

      const matched = [];
      let matchedWeight = 0;
      let totalWeight = 0;

      Object.entries(symWeights).forEach(([sym, wt]) => {
        totalWeight += wt;
        if (activeSymptoms.has(sym)) {
          matched.push(sym);
          matchedWeight += wt;
        }
      });

      if (matched.length === 0) return;

      let score = (matchedWeight / totalWeight) * 100;

      // Rule bonus
      const did = data.id || diseaseName;
      if (ruleBoosts[did]) {
        score += ruleBoosts[did];
      }

      // Negative findings penalty
      let penalty = 0;
      Object.entries(againstWeights).forEach(([sym, pen]) => {
        if (activeSymptoms.has(sym)) {
          penalty += (pen * 25.0);
        }
      });
      score -= penalty;

      // Duration modifier
      if (data.typical_duration && data.typical_duration.includes(duration)) {
        score += 4.0;
      }

      // Demographic modifier
      if (data.sex_relevance === "female_predominant" && patientGender === "female") {
        score += 2.0;
      } else if (data.sex_relevance === "male_predominant" && patientGender === "male") {
        score += 2.0;
      }

      const finalConfidence = Math.max(5, Math.min(96, Math.round(score)));

      results.push({
        disease: diseaseName,
        id: data.id,
        category: data.category,
        severity: data.severity || "moderate",
        urgency: data.urgency || "Moderate",
        icd11_code: data.icd11_code || "CA40",
        icd11_title: data.icd11_title || diseaseName,
        confidence: finalConfidence,
        matchedWeight: Math.round(matchedWeight * 10) / 10,
        totalWeight: Math.round(totalWeight * 10) / 10,
        matchedSymptoms: matched,
        unmatchedSymptoms: Object.keys(symWeights).filter(s => !activeSymptoms.has(s)),
        rules: activatedRules.filter(r => r.disease === diseaseName),
        description: data.description,
        source: data.source,
        sourceUrl: data.source_url,
        advice: data.advice
      });
    });

    results.sort((a, b) => b.confidence - a.confidence);

    const topResult = results[0] || null;
    const differentials = results.slice(1, 5);

    return {
      topResult,
      differentials,
      allResults: results,
      redFlags: triggeredRedFlags,
      hasRedFlags: triggeredRedFlags.length > 0,
      totalRulesActivated: activatedRules.length,
      activatedRules,
      evaluatedSymptomsCount: selectedSymptomIds.length,
      timestamp: new Date().toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
  }
}

// Global Engine Instance
window.ExpertEngine = new ExpertSystemEngine();
