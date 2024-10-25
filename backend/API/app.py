import json
import os
import firebase_admin
from firebase_admin import credentials, firestore, auth
from flask_cors import CORS
from flask import Flask, jsonify, request, send_file, send_from_directory
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv 
from functools import wraps
import requests

#cred = credentials.Certificate(r"e://Optifoo/backend/credentials/serviceAccountKey.json")
cred = credentials.Certificate("/Users/isaacrs/Desktop/Profesionalismo/Proyects/Optifoo/backend/credentials/serviceAccountKey.json")
firebase_admin.initialize_app(cred)


load_dotenv('.env')
firebase_api = os.getenv("NEXT_PUBLIC_FIREBASE_API_KEY")
gemini_api = os.getenv("NEXT_PUBLIC_GEMINI_API_KEY")


db = firestore.client()

app = Flask(__name__)

CORS(app)

'''
SECCION DE LOGIN Y SIGNUP
'''


error_messages = {
    "auth/invalid-id-token": "Token de autenticación no válido.",
    "auth/id-token-expired": "El token de autenticación ha expirado.",
    "auth/invalid-api-key": "Problema con la configuración de la API. Por favor, contacte al administrador.",
}

def handle_error(error):
    error_code = error.code if hasattr(error, 'code') else "internal"
    message = error_messages.get(error_code, "Ocurrió un error inesperado.")
    
    print(f"Error detectado: {error}")
    
    return jsonify({"error": message}), 400

#SECCION DE LOGIN Y SIGNUP----------------------------------------------------------
@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        # Obtener las credenciales del frontend
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')

        url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={firebase_api}"

        # Payload que se enviará a Firebase
        payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }

        response = requests.post(url, json=payload)
        firebase_data = response.json()

        if response.status_code != 200:
            return jsonify({"error": firebase_data.get('error', {}).get('message', 'Error al registrar usuario')}), 400

        user_uid = firebase_data.get('localId')
        id_token = firebase_data.get('idToken')

        user_ref = db.collection('users').document(user_uid)
        user_ref.set({
            'email': email,  
            'name': name,  
            'createdAt': firestore.SERVER_TIMESTAMP,  
            'allergies': [], 
            'diets': [],  
            'products': [], 
            'recipes': []  
        })

        return jsonify({"user": user_uid, "id_token": id_token}), 200

    except Exception as e:
        return handle_error(e)

@app.route('/api/login', methods=['POST'])
def login():
    try:
        # Obtener las credenciales del frontend
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={firebase_api}"

        payload = {
            "email": email,
            "password": password,
            "returnSecureToken": True
        }

        response = requests.post(url, json=payload)
        firebase_data = response.json()

        if response.status_code != 200:
            return jsonify({"error": firebase_data.get('error', {}).get('message', 'Error al autenticarse')}), 400

        id_token = firebase_data.get('idToken')

        return jsonify({"id_token": id_token, "user": firebase_data.get('localId')}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/login/google', methods=['POST'])
def google_login():
    try:
        data = request.get_json()
        id_token = data.get('id_token')
        
        decoded_token = auth.verify_id_token(id_token)
        user_uid = decoded_token['uid']
        
        user_ref = db.collection('users').document(user_uid)
        if not user_ref.get().exists:
            user_ref.set({
                'email': decoded_token['email'],
                'name': decoded_token['name'],
                'createdAt': firestore.SERVER_TIMESTAMP,
                'allergies': [],
                'diets': [],
                'products': [],
                'recipes': []
            })
        
        return jsonify({"user": user_uid}), 200
    
    except Exception as e:
        return handle_error(e)

@app.route('/api/login/github', methods=['POST'])
def github_login():
    try:
        data = request.get_json()
        id_token = data.get('id_token')
        
        decoded_token = auth.verify_id_token(id_token)
        user_uid = decoded_token['uid']
        
        user_ref = db.collection('users').document(user_uid)
        if not user_ref.get().exists:
            user_ref.set({
                'email': decoded_token['email'],
                'name': decoded_token['name'],
                'createdAt': firestore.SERVER_TIMESTAMP,
                'allergies': [],
                'diets': [],
                'products': [],
                'recipes': []
            })
        
        return jsonify({"user": user_uid}), 200
    
    except Exception as e:
        return handle_error(e)

'''
SECCION DE GET,POST,UPDATE,DELETE de de informacion en el usuario
'''

#SECCION DE ALERGIAS------------------------------------------------------------------
    
@app.route('/api/user/<user_uid>/get_allergies', methods=['GET'])
def get_allergies(user_uid):
    try:
        user_ref = db.collection('users').document(user_uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        allergies = user_doc.to_dict().get('allergies', [])

        return jsonify({"allergies": allergies}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/<user_uid>/update_allergies', methods=['POST'])
def update_allergies(user_uid):
    try:
        data = request.get_json()
        allergies = data.get('allergies')  

        if isinstance(allergies, str):
            allergies = [allergies]  
        elif not isinstance(allergies, list) or not all(isinstance(allergy, str) for allergy in allergies):
            return jsonify({"error": "El valor de allergies debe ser un string o una lista de strings."}), 400

        user_ref = db.collection('users').document(user_uid)

        user_ref.update({
            "allergies": firestore.ArrayUnion(allergies)
        })

        return jsonify({"message": "Alergias añadidas correctamente a la lista."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/<user_uid>/delete_allergy', methods=['DELETE'])
def delete_allergy(user_uid):
    try:
        data = request.get_json()
        allergy_to_remove = data.get('allergy')  

        if not isinstance(allergy_to_remove, str):
            return jsonify({"error": "La alergia debe ser un string."}), 400

        user_ref = db.collection('users').document(user_uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        current_allergies = user_doc.to_dict().get('allergies', [])

        if not isinstance(current_allergies, list):
            current_allergies = []

        updated_allergies = [allergy for allergy in current_allergies if allergy != allergy_to_remove]

        user_ref.update({
            "allergies": updated_allergies
        })

        return jsonify({"message": "Alergia eliminada correctamente."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#SECCION DE DIETAS--------------------------------------------------------------------

@app.route('/api/user/<user_uid>/get_diets', methods=['GET'])
def get_diets(user_uid):
    try:
        user_ref = db.collection('users').document(user_uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        diets = user_doc.to_dict().get('diets', [])

        return jsonify({"diets": diets}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/<user_uid>/update_diets', methods=['POST'])
def update_diets(user_uid):
    try:
        data = request.get_json()
        diets = data.get('diets')  

        if isinstance(diets, str):
            diets = [diets]
        elif not isinstance(diets, list) or not all(isinstance(diet, str) for diet in diets):
            return jsonify({"error": "El valor de diets debe ser un string o una lista de strings."}), 400

        user_ref = db.collection('users').document(user_uid)

        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        current_diets = user_doc.to_dict().get('diets', [])

        if not isinstance(current_diets, list):
            current_diets = []

        updated_diets = current_diets + diets

        user_ref.update({
            "diets": firestore.ArrayUnion(updated_diets)
        })

        return jsonify({"message": "Diets añadidas correctamente a la lista."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/<user_uid>/delete_diet', methods=['DELETE'])
def delete_diet(user_uid):
    try:
        data = request.get_json()
        diet_to_remove = data.get('diet')  

        if not isinstance(diet_to_remove, str):
            return jsonify({"error": "La dieta debe ser un string."}), 400

        user_ref = db.collection('users').document(user_uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        current_diets = user_doc.to_dict().get('diets', [])

        if not isinstance(current_diets, list):
            current_diets = []

        updated_diets = [diet for diet in current_diets if diet != diet_to_remove]

        user_ref.update({
            "diets": updated_diets
        })

        return jsonify({"message": "Dieta eliminada correctamente."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

#SECCION DE PRODUCTOS-------------------------------------------------------------------

@app.route('/api/user/<user_uid>/get_products', methods=['GET'])
def get_products(user_uid):
    try:
        user_ref = db.collection('users').document(user_uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        products = user_doc.to_dict().get('products', [])

        return jsonify({"products": products}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/<user_uid>/update_products', methods=['POST'])
def update_products(user_uid):
    try:
        data = request.get_json()
        products = data.get('products')  

        if not isinstance(products, list) or not all(isinstance(p, dict) for p in products):
            return jsonify({"error": "La lista de products debe ser una lista de diccionarios."}), 400

        for product in products:
            if not all(key in product for key in ("productId", "quantity", "expireDate", "storedAt")):
                return jsonify({"error": "Cada product debe tener las claves 'productId', 'quantity', 'expireDate', y 'storedAt'."}), 400

        user_ref = db.collection('users').document(user_uid)

        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        current_products = user_doc.to_dict().get('products', [])

        if not isinstance(current_products, list):
            current_products = []

        product_dict = {p['productId']: p for p in current_products}

        for new_product in products:
            product_id = new_product['productId']
            
            if product_id in product_dict:
                existing_product = product_dict[product_id]

                existing_product['quantity'] = new_product.get('quantity', existing_product['quantity'])

                existing_product['expireDate'] = new_product.get('expireDate', existing_product['expireDate'])
                existing_product['storedAt'] = new_product.get('storedAt', existing_product['storedAt'])
            else:
                current_products.append(new_product)

        user_ref.update({
            "products": current_products
        })

        return jsonify({"message": "Productos actualizados correctamente."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/<user_uid>/delete_product', methods=['DELETE'])
def delete_product(user_uid):
    try:
        data = request.get_json()
        product_id_to_remove = data.get('productId')  

        if not isinstance(product_id_to_remove, str):
            return jsonify({"error": "El productId debe ser un string."}), 400

        user_ref = db.collection('users').document(user_uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        current_products = user_doc.to_dict().get('products', [])

        if not isinstance(current_products, list):
            current_products = []

        updated_products = [product for product in current_products if product.get('productId') != product_id_to_remove]

        user_ref.update({
            "products": updated_products
        })

        return jsonify({"message": "Producto eliminado correctamente."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#SECCION DE RECETAS--------------------------------------------------------------

@app.route('/api/user/<user_uid>/get_recipes', methods=['GET'])
def get_recipes(user_uid):
    try:
        user_ref = db.collection('users').document(user_uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        recipes = user_doc.to_dict().get('recipes', [])

        return jsonify({"recipes": recipes}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/<user_uid>/update_recipes', methods=['POST'])
def update_recipes(user_uid):
    try:
        data = request.get_json()
        recipes = data.get('recipes')  

        if isinstance(recipes, str):
            recipes = [recipes]
        elif not isinstance(recipes, list) or not all(isinstance(recipe, str) for recipe in recipes):
            return jsonify({"error": "El valor de recipes debe ser un string o una lista de strings."}), 400

        user_ref = db.collection('users').document(user_uid)

        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        current_recipes = user_doc.to_dict().get('recipes', [])

        if not isinstance(current_recipes, list):
            current_recipes = []

        updated_recipes = current_recipes + recipes

        user_ref.update({
            "recipes": updated_recipes
        })

        return jsonify({"message": "Recetas añadidas correctamente a la lista."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/<user_uid>/delete_recipe', methods=['DELETE'])
def delete_recipe(user_uid):
    try:
        data = request.get_json()
        recipe_to_remove = data.get('recipe')  

        if not isinstance(recipe_to_remove, str):
            return jsonify({"error": "La receta debe ser un string."}), 400

        user_ref = db.collection('users').document(user_uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return jsonify({"error": "Usuario no encontrado."}), 404

        current_recipes = user_doc.to_dict().get('recipes', [])

        if not isinstance(current_recipes, list):
            current_recipes = []

        updated_recipes = [recipe for recipe in current_recipes if recipe != recipe_to_remove]

        user_ref.update({
            "recipes": updated_recipes
        })

        return jsonify({"message": "Receta eliminada correctamente."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

'''
SECCION DE GET,POST,UPDATE,DELETE de de informacion en el Producto
'''
@app.route('/api/addproduct', methods=['POST'])
def create_product():
    try:
        data = request.get_json()
        name = data.get('name')
        category = data.get('category')
        is_recipy = data.get('beRecipy')

        if not all([name, category]) or not isinstance(is_recipy, bool):
            return jsonify({"error": "Faltan datos o el valor de 'isRecipy' no es válido."}), 400

        existing_products = db.collection('product').where('name', '==', name).where('category', '==', category).stream()

        if any(existing_products):
            return jsonify({"error": "El producto ya existe."}), 409

        product_ref = db.collection('product').document()

        product_data = {
            "name": name,
            "category": category,
            "idProducto": product_ref.id,  
            "beRecipy": is_recipy,
            "url_product": ""
        }

        product_ref.set(product_data)

        return jsonify({"message": "Producto creado exitosamente.", "product": product_data}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/api/getproduct/<product_id>', methods=['GET'])
def get_product_by_id(product_id):
    try:
        product_ref = db.collection('product').document(product_id)
        product_doc = product_ref.get()

        if not product_doc.exists:
            return jsonify({"error": "Producto no encontrado."}), 404

        return jsonify({"product": product_doc.to_dict()}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/getproducts', methods=['GET'])
def get_all_products():
    try:
        products_ref = db.collection('product')
        products = products_ref.stream()

        products_list = [product.to_dict() for product in products]

        return jsonify({"products": products_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/updateproduct/<product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        data = request.get_json()

        name = data.get('name')
        category = data.get('category')
        is_recipy = data.get('beRecipy')
        url_imagen = data.get('url_product')

        if not any([name, category, is_recipy is not None]):
            return jsonify({"error": "Se requiere al menos un campo para actualizar."}), 400

        product_ref = db.collection('product').document(product_id)

        product_doc = product_ref.get()

        if not product_doc.exists:
            return jsonify({"error": "Producto no encontrado."}), 404

        update_data = {}
        if name:
            update_data["name"] = name
        if category:
            update_data["category"] = category
        if is_recipy is not None:
            update_data["beRecipy"] = is_recipy
        if url_imagen:
            update_data["url_product"] = url_imagen


        product_ref.update(update_data)

        return jsonify({"message": "Producto actualizado correctamente.", "product": update_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/removeproduct/<product_id>', methods=['DELETE'])
def deleteproduct(product_id):
    try:
        product_ref = db.collection('product').document(product_id)
        product_doc = product_ref.get()

        if not product_doc.exists:
            return jsonify({"error": "Producto no encontrado."}), 404

        product_ref.delete()

        return jsonify({"message": "Producto eliminado correctamente."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

'''
SECCION DE GET,POST,UPDATE,DELETE de de informacion en el Recipy
'''
@app.route('/api/addrecipy', methods=['POST'])
def create_recipy():
    try:
        data = request.get_json()
        title = data.get('title')
        ingredients = data.get('ingredients')
        time_to_prepare = data.get('timeToPrepare')
        be_public = data.get('bePublic')
        made_by = data.get('madeBy')
        categories = data.get('categories')
        steps = data.get('steps')

        if not isinstance(title, str) or not title.strip():
            return jsonify({"error": "Title must be a non-empty string"}), 400

        if not isinstance(ingredients, list) or not all(isinstance(ingredient, dict) for ingredient in ingredients):
            return jsonify({"error": "La lista de ingredients debe ser una lista de diccionarios con 'idProduct' y 'quantity'."}), 400

        if not all('idProduct' in ingredient and 'quantity' in ingredient for ingredient in ingredients):
            return jsonify({"error": "Cada ingredient debe tener 'idProduct' y 'quantity'."}), 400
        
        if not isinstance(time_to_prepare, int) or not isinstance(be_public, bool) or not isinstance(made_by, str):
            return jsonify({"error": "Faltan datos o el formato no es correcto."}), 400
        
        if not isinstance(categories, list) or not all(isinstance(category, str) for category in categories):
            return jsonify({"error": "Categories must be a list of strings"}), 400
        
        if not isinstance(steps, list) or not all(isinstance(step, str) for step in steps):
            return jsonify({"error": "Steps must be a list of strings"}), 400

        recipy_ref = db.collection('recipy').document()

        recipy_data = {
            "idRecipy": recipy_ref.id, 
            "title": title, 
            "ingredients": ingredients,
            "timeToPrepare": time_to_prepare,
            "bePublic": be_public,
            "madeBy": made_by,
            "categories": categories,
            "steps": steps
        }

        recipy_ref.set(recipy_data)

        return jsonify({"message": "Receta creada exitosamente.", "recipy": recipy_data}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/getrecipy/<recipy_id>', methods=['GET'])
def get_recipy_by_id(recipy_id):
    try:
        recipy_ref = db.collection('recipy').document(recipy_id)
        recipy_doc = recipy_ref.get()

        if not recipy_doc.exists:
            return jsonify({"error": "Receta no encontrada."}), 404

        recipy_data = recipy_doc.to_dict()
        recipy_data['idRecipy'] = recipy_id  

        return jsonify({"recipy": recipy_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/getrecipies', methods=['GET'])
def get_all_recipies():
    try:
        recipies_ref = db.collection('recipy')
        recipies = recipies_ref.stream()

        recipies_list = []
        for recipy in recipies:
            recipy_data = recipy.to_dict()
            recipy_data['idRecipy'] = recipy.id 
            recipies_list.append(recipy_data)

        return jsonify({"recipies": recipies_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/updaterecipy/<recipy_id>', methods=['PUT'])
def update_recipy(recipy_id):
    try:
        data = request.get_json()

        ingredients = data.get('ingredients')
        time_to_prepare = data.get('timeToPrepare')
        be_public = data.get('bePublic')

        update_data = {}

        if ingredients:
            if not isinstance(ingredients, list) or not all(isinstance(ingredient, dict) for ingredient in ingredients):
                return jsonify({"error": "La lista de ingredients debe ser una lista de diccionarios con 'idProduct' y 'quantity'."}), 400
            if not all('idProduct' in ingredient and 'quantity' in ingredient for ingredient in ingredients):
                return jsonify({"error": "Cada ingredient debe tener 'idProduct' y 'quantity'."}), 400
            update_data['ingredients'] = ingredients

        if time_to_prepare is not None:
            if not isinstance(time_to_prepare, int):
                return jsonify({"error": "El tiempo para preparar debe ser un entero."}), 400
            update_data['timeToPrepare'] = time_to_prepare

        if be_public is not None:
            if not isinstance(be_public, bool):
                return jsonify({"error": "El valor de 'bePublic' debe ser un booleano."}), 400
            update_data['bePublic'] = be_public

        recipy_ref = db.collection('recipy').document(recipy_id)
        recipy_doc = recipy_ref.get()

        if not recipy_doc.exists:
            return jsonify({"error": "Receta no encontrada."}), 404

        recipy_ref.update(update_data)

        return jsonify({"message": "Receta actualizada correctamente.", "recipy": update_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/removerecipy/<recipy_id>', methods=['DELETE'])
def delete_recipy(recipy_id):
    try:
        recipy_ref = db.collection('recipy').document(recipy_id)
        recipy_doc = recipy_ref.get()

        if not recipy_doc.exists:
            return jsonify({"error": "Receta no encontrada."}), 404

        recipy_ref.delete()

        return jsonify({"message": "Receta eliminada correctamente."}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/api/generate", methods=["POST"])
def generate_recipy():
    if request.method == "POST":
        try:
            req_body = request.get_json()

            ingredients = req_body.get("ingredients", [])
            preferences = req_body.get("preferences", [])
            restrictions = req_body.get("restrictions",[])

            if isinstance(ingredients, str):
                ingredients = [ingredients]
            if isinstance(preferences, str):
                preferences = [preferences]
            if isinstance(restrictions, str):
                restrictions = [restrictions]
            

            if not ingredients:
                return jsonify({"error": "Se deben proporcionar ingredientes para generar una receta"}), 400

            content = (      
                f"Generate a recipe based on the following ingredients: {', '.join(ingredients)}. "
                f"Take into account the following preferences: {', '.join(preferences)}. "
                f"Consider the following dietary restrictions: {', '.join(restrictions)}. "
                "Please generate a recipe in the following format:"+
                "**Title:** Recipe Name"
                "**Ingredients:**"+
                "1. Ingredient Name: Quantity, Description of Ingredient"+
                "2. Ingredient Name: Quantity, Description of Ingredient"+
                "..."+
                "**Steps:**"+
                "1. Step Description"+
                "2. Step Description"+
                "..."+
                "**Dietary Considerations:**"+
                "- Dietary Consideration 1"+
                "- Dietary Consideration 2"+
                "..."+
                "Make sure to avoid using markdown for the steps or ingredients."+
                "Ensure that each ingredient and step is listed with the respective number."+
                "Always follow this structure without adding any extra symbols like '*' or '_' before or after the list elements."
            )


            model = ChatGoogleGenerativeAI(model=req_body.get("model","gemini-pro"), api_key = gemini_api)

            message = HumanMessage(content=content)

            response = model.stream([message])

            def stream():
                for chunk in response:
                    yield 'data: %s\n\n' % json.dumps({"text": chunk.content})

            return stream(), {'Content-Type': 'text/event-stream'}

        except Exception as e:
            return jsonify({"error": str(e)})


@app.route("/api/generate-image", methods=["POST"])
def generate_recipe_image():
    if request.method == "POST":
        try:
            req_body = request.get_json()

            ingredients = req_body.get("ingredients", [])
            preferences = req_body.get("preferences", [])
            restrictions = req_body.get("restrictions",[])

            if isinstance(ingredients, str):
                ingredients = [ingredients]
            if isinstance(preferences, str):
                preferences = [preferences]
            if isinstance(restrictions, str):
                restrictions = [restrictions]

            if not ingredients:
                return jsonify({"error": "Se deben proporcionar ingredientes para generar una receta"}), 400

            content = (      
                f"Create a dish image based on the following ingredients: {', '.join(ingredients)}. "
                f"Take into account the following preferences: {', '.join(preferences)}. "
                f"Consider the following dietary restrictions: {', '.join(restrictions)}. "
                "Please generate an image that reflects the dish with these ingredients."
            )

            gemini_api_url = "https://api.gemini.com/v1/images/generations"
            headers = {
                "Authorization": f"Bearer {gemini_api}",
                "Content-Type": "application/json"
            }
            data = {
                "prompt": content,
                "n": 1,
                "size": "1024x1024"
            }

            response = requests.post(gemini_api_url, headers=headers, json=data)
            if response.status_code != 200:
                return jsonify({"error": f"Failed to generate image: {response.text}"}), 400

            image_url = response.json()['data'][0]['url']

            return jsonify({"image_url": image_url}), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=5001)