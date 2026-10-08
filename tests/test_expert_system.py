"""
Automated Test Suite for MedExpert
Runs unit tests for knowledge base loading, symptom search, synonym matching,
rule engine logic, safety red-flag overrides, and diagnostic evaluation metrics.
"""

import unittest
import os
import json
from expert_engine import ClinicalExpertEngine
from data.evaluation_cases import EVALUATION_BENCHMARK

class TestMedExpertKnowledgeBase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.engine = ClinicalExpertEngine()

    def test_01_knowledge_base_loading(self):
        """Verify diseases, symptoms, rules and sources load cleanly."""
        self.assertGreaterEqual(len(self.engine.diseases), 35)
        self.assertGreaterEqual(len(self.engine.symptoms), 120)
        self.assertGreaterEqual(len(self.engine.rules), 35)
        self.assertGreaterEqual(len(self.engine.red_flags), 8)

    def test_02_icd11_and_source_integrity(self):
        """Ensure every disease has an authoritative ICD-11 code and source citation."""
        for did, d in self.engine.diseases.items():
            self.assertTrue(d.get("icd11_code"), f"Disease {did} missing ICD-11 code")
            self.assertTrue(d.get("source"), f"Disease {did} missing source reference")
            self.assertTrue(d.get("source_url"), f"Disease {did} missing source URL")

    def test_03_search_symptoms_exact_and_aliases(self):
        """Test symptom autocomplete and alias search."""
        # Exact name
        res = self.engine.search_symptoms("headache")
        self.assertTrue(any(s["id"] == "headache" for s in res))

        # Alias: "high temperature" -> fever
        res_alias = self.engine.search_symptoms("high temperature")
        self.assertTrue(any(s["id"] in ["fever", "high_fever"] for s in res_alias))

        # Typo tolerance: "feaver" -> fever
        res_typo = self.engine.search_symptoms("feaver")
        self.assertTrue(any(s["id"] in ["fever", "high_fever"] for s in res_typo))

        # Case-insensitive
        res_upper = self.engine.search_symptoms("FEVER")
        self.assertTrue(any(s["id"] in ["fever", "high_fever"] for s in res_upper))

    def test_04_rule_engine_deterministic_flu(self):
        """Test forward chaining rule activation for classic flu symptoms."""
        symptoms = ["fever", "cough", "fatigue"]
        eval_res = self.engine.evaluate_differential(symptoms)
        top = eval_res["top_match"]
        self.assertIsNotNone(top)
        self.assertEqual(top["disease"], "Influenza (Flu)")
        self.assertGreater(top["confidence"], 35)
        self.assertGreater(len(eval_res["differentials"]), 0)

    def test_05_rule_engine_covid19_anosmia(self):
        """Test specific hallmark rule R05 for loss of taste/smell."""
        eval_res = self.engine.evaluate_differential(["loss_of_taste_smell", "fever"])
        top = eval_res["top_match"]
        self.assertEqual(top["disease"], "COVID-19")
        rule_ids = [r["rule_id"] for r in eval_res["activated_rules"]]
        self.assertIn("R05", rule_ids)

    def test_06_red_flag_safety_stroke(self):
        """Test FAST stroke red flag triggers emergency warning."""
        res = self.engine.evaluate_differential(["face_drooping", "speech_difficulty"])
        self.assertTrue(res["has_red_flags"])
        self.assertTrue(any("Stroke" in rf["name"] for rf in res["red_flags"]))

    def test_07_red_flag_safety_cardiac(self):
        """Test acute coronary syndrome red flag triggers."""
        res = self.engine.evaluate_differential(["chest_pain_radiating", "cold_sweat"])
        self.assertTrue(res["has_red_flags"])
        self.assertTrue(any("Coronary" in rf["name"] or "Cardiac" in rf["name"] for rf in res["red_flags"]))

    def test_08_run_evaluation_benchmark_metrics(self):
        """
        Runs rigorous evaluation benchmark and prints actual Top-1, Top-3 accuracy
        and Red-Flag sensitivity without fabricated numbers.
        """
        top1_correct = 0
        top3_correct = 0
        diagnosable_cases = 0
        red_flag_detected = 0
        total_red_flag_cases = 0

        for case in EVALUATION_BENCHMARK:
            res = self.engine.evaluate_differential(
                case["symptoms"],
                case.get("patient_info"),
                case.get("clinical_answers")
            )

            if case.get("has_red_flags"):
                total_red_flag_cases += 1
                if res["has_red_flags"]:
                    red_flag_detected += 1

            if case.get("expected_top"):
                diagnosable_cases += 1
                expected = case["expected_top"]
                top_match = res["top_match"]["disease"] if res["top_match"] else None
                top3 = [res["top_match"]["disease"]] + [d["disease"] for d in res["differentials"][:2]] if res["top_match"] else []

                if top_match == expected:
                    top1_correct += 1
                if expected in top3:
                    top3_correct += 1

        top1_acc = (top1_correct / diagnosable_cases) * 100 if diagnosable_cases > 0 else 0
        top3_acc = (top3_correct / diagnosable_cases) * 100 if diagnosable_cases > 0 else 0
        rf_sensitivity = (red_flag_detected / total_red_flag_cases) * 100 if total_red_flag_cases > 0 else 0

        print(f"\n=======================================================")
        print(f" CLINICAL BENCHMARK EVALUATION METRICS (ACTUAL)")
        print(f" Diagnosable Cases Evaluated: {diagnosable_cases}")
        print(f" Top-1 Accuracy: {top1_acc:.1f}% ({top1_correct}/{diagnosable_cases})")
        print(f" Top-3 Accuracy: {top3_acc:.1f}% ({top3_correct}/{diagnosable_cases})")
        print(f" Red-Flag Detection Sensitivity: {rf_sensitivity:.1f}% ({red_flag_detected}/{total_red_flag_cases})")
        print(f"=======================================================\n")

        self.assertGreaterEqual(top1_acc, 85.0)
        self.assertGreaterEqual(top3_acc, 95.0)
        self.assertEqual(rf_sensitivity, 100.0)

if __name__ == "__main__":
    unittest.main()
