import json
import os

from flask import Flask, jsonify, request, send_from_directory

from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv 

app = Flask(__name__)

load_dotenv('.env.local')
# Asegúrate de que tu clave de API esté correctamente configurada en las variables de entorno
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")

@app.route('/')
def home():
    response_type = request.args.get('response_type', 'text')
    
    if response_type == 'json':
        return jsonify({"mensaje": "Bienvenido a la API de generación de recetas"}), 200
    else:
        return "Bienvenido a la API de generación de recetas", 200


@app.route("/api/generate", methods=["POST"])
def generate_api():
    if request.method == "POST":
        try:
            req_body = request.get_json()

            ingredients = req_body.get("ingredients", [])
            preferences = req_body.get("preferences", "")

            if not ingredients:
                return jsonify({"error": "Se deben proporcionar ingredientes para generar una receta"}), 400

            content = (
                f"Genera una receta basada en los siguientes ingredientes: {', '.join(ingredients)}. "
                f"Ten en cuenta las siguientes preferencias o restricciones: {preferences}. "
                "Por favor incluye los pasos para preparar la receta y las cantidades aproximadas de cada ingrediente."
            )

            model = ChatGoogleGenerativeAI(model=req_body.get("model"))

            message = HumanMessage(content=content)

            response = model.stream([message])

            def stream():
                for chunk in response:
                    yield 'data: %s\n\n' % json.dumps({"text": chunk.content})

            return stream(), {'Content-Type': 'text/event-stream'}

        except Exception as e:
            return jsonify({"error": str(e)})

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('web', path)

if __name__ == '__main__':
    app.run(debug=True)
