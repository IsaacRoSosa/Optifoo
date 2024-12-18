import requests

# URL de tu API
url = "http://localhost:5001/api/addproduct"

# Lista de productos en inglés
products = [
    {"name": "Apple", "category": "Fruit", "beRecipy": False},
    {"name": "Banana", "category": "Fruit", "beRecipy": False},
    {"name": "Orange", "category": "Fruit", "beRecipy": False},
    {"name": "Pear", "category": "Fruit", "beRecipy": False},
    {"name": "Mango", "category": "Fruit", "beRecipy": False},
    {"name": "Strawberry", "category": "Fruit", "beRecipy": False},
    {"name": "Kiwi", "category": "Fruit", "beRecipy": False},
    {"name": "Melon", "category": "Fruit", "beRecipy": False},
    {"name": "Watermelon", "category": "Fruit", "beRecipy": False},
    {"name": "Grape", "category": "Fruit", "beRecipy": False},
    {"name": "Cherry", "category": "Fruit", "beRecipy": False},
    {"name": "Papaya", "category": "Fruit", "beRecipy": False},
    {"name": "Pineapple", "category": "Fruit", "beRecipy": False},
    {"name": "Raspberry", "category": "Fruit", "beRecipy": False},
    {"name": "Blackberry", "category": "Fruit", "beRecipy": False},
    {"name": "Peach", "category": "Fruit", "beRecipy": False},
    {"name": "Apricot", "category": "Fruit", "beRecipy": False},
    {"name": "Plum", "category": "Fruit", "beRecipy": False},
    {"name": "Fig", "category": "Fruit", "beRecipy": False},
    {"name": "Coconut", "category": "Fruit", "beRecipy": False},
    {"name": "Tomato", "category": "Vegetable", "beRecipy": False},
    {"name": "Carrot", "category": "Vegetable", "beRecipy": False},
    {"name": "Spinach", "category": "Vegetable", "beRecipy": False},
    {"name": "Lettuce", "category": "Vegetable", "beRecipy": False},
    {"name": "Cucumber", "category": "Vegetable", "beRecipy": False},
    {"name": "Zucchini", "category": "Vegetable", "beRecipy": False},
    {"name": "Eggplant", "category": "Vegetable", "beRecipy": False},
    {"name": "Broccoli", "category": "Vegetable", "beRecipy": False},
    {"name": "Cauliflower", "category": "Vegetable", "beRecipy": False},
    {"name": "Potato", "category": "Vegetable", "beRecipy": False},
    {"name": "Onion", "category": "Vegetable", "beRecipy": False},
    {"name": "Garlic", "category": "Vegetable", "beRecipy": False},
    {"name": "Bell Pepper", "category": "Vegetable", "beRecipy": False},
    {"name": "Chayote", "category": "Vegetable", "beRecipy": False},
    {"name": "Beet", "category": "Vegetable", "beRecipy": False},
    {"name": "Nopal", "category": "Vegetable", "beRecipy": False},
    {"name": "Green Bean", "category": "Vegetable", "beRecipy": False},
    {"name": "Pumpkin", "category": "Vegetable", "beRecipy": False},
    {"name": "Tomatillo", "category": "Vegetable", "beRecipy": False},
    {"name": "Artichoke", "category": "Vegetable", "beRecipy": False},
    {"name": "Mushroom", "category": "Mushroom", "beRecipy": False},
    {"name": "Shiitake", "category": "Mushroom", "beRecipy": False},
    {"name": "Chicken", "category": "Meat", "beRecipy": False},
    {"name": "Turkey", "category": "Meat", "beRecipy": False},
    {"name": "Beef", "category": "Meat", "beRecipy": False},
    {"name": "Pork", "category": "Meat", "beRecipy": False},
    {"name": "Lamb", "category": "Meat", "beRecipy": False},
    {"name": "Sausage", "category": "Meat", "beRecipy": False},
    {"name": "Bacon", "category": "Meat", "beRecipy": False},
    {"name": "Fish", "category": "Fish", "beRecipy": False},
    {"name": "Salmon", "category": "Fish", "beRecipy": False},
    {"name": "Tuna", "category": "Fish", "beRecipy": False},
    {"name": "Trout", "category": "Fish", "beRecipy": False},
    {"name": "Shrimp", "category": "Seafood", "beRecipy": False},
    {"name": "Lobster", "category": "Seafood", "beRecipy": False},
    {"name": "Squid", "category": "Seafood", "beRecipy": False},
    {"name": "Octopus", "category": "Seafood", "beRecipy": False},
    {"name": "Oysters", "category": "Seafood", "beRecipy": False},
    {"name": "Clams", "category": "Seafood", "beRecipy": False},
    {"name": "Rice", "category": "Grain", "beRecipy": False},
    {"name": "Oats", "category": "Grain", "beRecipy": False},
    {"name": "Wheat", "category": "Grain", "beRecipy": False},
    {"name": "Corn", "category": "Grain", "beRecipy": False},
    {"name": "Quinoa", "category": "Grain", "beRecipy": False},
    {"name": "Barley", "category": "Grain", "beRecipy": False},
    {"name": "Almond", "category": "Nuts", "beRecipy": False},
    {"name": "Walnut", "category": "Nuts", "beRecipy": False},
    {"name": "Pistachio", "category": "Nuts", "beRecipy": False},
    {"name": "Hazelnut", "category": "Nuts", "beRecipy": False},
    {"name": "Peanut", "category": "Nuts", "beRecipy": False},
    {"name": "Milk", "category": "Dairy", "beRecipy": False},
    {"name": "Cheese", "category": "Dairy", "beRecipy": False},
    {"name": "Yogurt", "category": "Dairy", "beRecipy": False},
    {"name": "Cream", "category": "Dairy", "beRecipy": False},
    {"name": "Butter", "category": "Dairy", "beRecipy": False},
    {"name": "Egg", "category": "Protein", "beRecipy": False},
    {"name": "Tofu", "category": "Protein", "beRecipy": False},
    {"name": "Soy", "category": "Protein", "beRecipy": False},
    {"name": "Lentils", "category": "Legume", "beRecipy": False},
    {"name": "Beans", "category": "Legume", "beRecipy": False},
    {"name": "Chickpeas", "category": "Legume", "beRecipy": False},
    {"name": "Peas", "category": "Legume", "beRecipy": False},
    {"name": "Olive Oil", "category": "Oil", "beRecipy": False},
    {"name": "Coconut Oil", "category": "Oil", "beRecipy": False},
    {"name": "Sunflower Oil", "category": "Oil", "beRecipy": False},
    {"name": "Honey", "category": "Sweetener", "beRecipy": False}
]

# Automatizar la creación de productos en la API
for product in products:
    try:
        response = requests.post(url, json=product)
        if response.status_code == 201:
            print(f"Producto '{product['name']}' creado exitosamente.")
        else:
            print(f"Error al crear el producto '{product['name']}': {response.text}")
    except Exception as e:
        print(f"Error al conectarse a la API para el producto '{product['name']}': {str(e)}")