from flask import Flask, render_template, request, jsonify
import requests, os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

WOLFRAM_APP_ID = os.getenv("WOLFRAM_APP_ID")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    question = request.json.get("question", "")[:300]

    url = "http://api.wolframalpha.com/v1/result"
    params = {
        "i": question,
        "appid": WOLFRAM_APP_ID
    }

    try:
        res = requests.get(url, params=params, timeout=5)
        answer = res.text if res.status_code == 200 else "Try rephrasing your question."
    except:
        answer = "Something went wrong. Please try again."

    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(debug=True)