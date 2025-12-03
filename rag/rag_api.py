from flask import Flask, request, jsonify
from rag_engine import get_answer
import os

app = Flask(__name__)

# ✅ API endpoint for asking questions
@app.route("/ask", methods=["POST"])
def ask_question():
    try:
        data = request.get_json(force=True)
        query = data.get("query", "").strip()

        if not query:
            return jsonify({"error": "Missing query"}), 400

        print(f"🧠 User Query: {query}")
        answer = get_answer(query)

        print(f"💬 AI Answer: {answer}")
        return jsonify({"answer": answer})

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # ✅ IMPORTANT for Render: use Render-assigned PORT
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
