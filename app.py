from flask import Flask, jsonify, request
from flask_cors import CORS  # <-- Import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)  # <-- Enable CORS for all routes

# Set up the API key from environment or config
genai.configure(api_key=' ')

@app.route("/chat", methods=["POST"])
def chat():
    prompt = request.json.get("message")
    model = genai.GenerativeModel("gemini-1.5-flash")
    chat = model.start_chat(history=[])
    response = chat.send_message(prompt, stream=False)
    return jsonify({"response": response.text})


if __name__ == "__main__":
    app.run(debug=True)
