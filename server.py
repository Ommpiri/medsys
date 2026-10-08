"""
MedExpert Production Dual-Mode Server
Serves static assets, REST APIs, and full clinical diagnostic evaluation endpoints.
Compatible with both modern FastAPI and Python Standard Library http.server (100% offline & zero-dependency).
"""

import os
import sys
import json
from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.parse
from expert_engine import ClinicalExpertEngine

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PORT", 8000))
engine = ClinicalExpertEngine()

class MedExpertHTTPHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            resp = {"status": "healthy", "service": "MedExpert Clinical API", "version": "2.0.0"}
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        elif parsed.path == "/api/stats":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            stats = engine.get_kb_statistics()
            self.wfile.write(json.dumps(stats).encode("utf-8"))
            return

        elif parsed.path == "/api/symptoms/search":
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

        elif parsed.path == "/" or parsed.path == "":
            self.path = "/index.html"

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/diagnose":
            length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(length)
            try:
                data = json.loads(body.decode("utf-8"))
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

def run_server():
    print(f"============================================================")
    print(f" Starting MedExpert Production Clinical Server")
    print(f" URL: http://127.0.0.1:{PORT}")
    print(f" Knowledge Base: v2.0.0 (35 conditions, 121 symptoms, 37 rules)")
    print(f" Health check: http://127.0.0.1:{PORT}/health")
    print(f"============================================================")
    server = HTTPServer(("127.0.0.1", PORT), MedExpertHTTPHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
        server.server_close()

if __name__ == "__main__":
    run_server()
