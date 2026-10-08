"""
Vercel Serverless Function entry point for MedExpert Clinical API.
Handles /api/diagnose, /api/stats, and /api/symptoms/search on Vercel without external servers.
"""

from http.server import BaseHTTPRequestHandler
import json
import os
import sys
import urllib.parse

# Ensure project root is in sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from expert_engine import ClinicalExpertEngine

engine = ClinicalExpertEngine()

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")
        # Normalize: ensure path without trailing slash and match either with or without /api prefix
        # If root or index.html is requested, serve the frontend HTML
        if path in ["", "/index.html"]:
            index_file = os.path.join(BASE_DIR, "index.html")
            if os.path.exists(index_file):
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
                with open(index_file, "rb") as f:
                    self.wfile.write(f.read())
                return

        subpath = path[4:] if path.startswith("/api") else path

        if subpath in ["/health", "/api/health"]:
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy", "service": "MedExpert Vercel Serverless API", "version": "2.0.0"}).encode("utf-8"))
            return

        elif subpath == "/stats":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            stats = engine.get_kb_statistics()
            self.wfile.write(json.dumps(stats).encode("utf-8"))
            return

        elif subpath.startswith("/symptoms/search"):
            qs = urllib.parse.parse_qs(parsed.query)
            q = qs.get("q", [""])[0]
            cat = qs.get("category", ["All"])[0]
            results = engine.search_symptoms(q, cat)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(results).encode("utf-8"))
            return

        self.send_response(404)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"error": f"Endpoint not found: {self.path}"}).encode("utf-8"))

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/")
        subpath = path[4:] if path.startswith("/api") else path

        if subpath == "/diagnose":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode("utf-8"))
                symptoms = data.get("symptoms", [])
                patient_info = {
                    "age": data.get("age", 25),
                    "gender": data.get("gender", "Male"),
                    "id": data.get("patient_id", "P-1000")
                }
                clinical_answers = data.get("clinical_answers", {})
                evaluation = engine.evaluate_differential(symptoms, patient_info, clinical_answers)

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps(evaluation).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()
