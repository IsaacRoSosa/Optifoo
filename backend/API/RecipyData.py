import requests

url = "http://localhost:5001/api/addrecipy"
url_product = "http://localhost:5001/api/getproduct_or_create"



recipies = [
  {
    "title": "Grilled Chicken with Roasted Vegetables",
    "ingredients": [
      {
        "name": "Chicken breasts",
        "quantity": "4",
        "description": "Boneless, skinless",
        "category": "Meat"
      },
      {
        "name": "Broccoli florets",
        "quantity": "1 cup",
        "description": "Fresh or frozen",
        "category": "Vegetable"
      },
      {
        "name": "Bell peppers",
        "quantity": "1",
        "description": "Any color, chopped",
        "category": "Vegetable"
      },
      {
        "name": "Zucchini",
        "quantity": "1",
        "description": "Chopped",
        "category": "Vegetable"
      },
      {
        "name": "Olive oil",
        "quantity": "2 tablespoons",
        "description": "",
        "category": "Oil"
      },
      {
        "name": "Salt",
        "quantity": "To taste",
        "description": "",
        "category": "Seasoning"
      },
      {
        "name": "Pepper",
        "quantity": "To taste",
        "description": "",
        "category": "Seasoning"
      }
    ],
    "steps": [
      "Preheat the oven to 400 degrees F (200 degrees C).",
      "In a large bowl, combine the chicken breasts, broccoli florets, bell peppers, zucchini, olive oil, salt, and pepper.",
      "Toss to coat.",
      "Spread the mixture onto a baking sheet.",
      "Bake for 20-25 minutes, or until the chicken is cooked through and the vegetables are tender.",
      "Serve immediately."
    ],
    "dietary_considerations": [
      "Low-carb"
    ],
    "timeToPrepare": "30 minutes",
    "difficulty": "Easy",
  },
  {
    "title": "Quinoa Salad with Feta and Cucumber",
    "ingredients": [
      {
        "name": "Quinoa",
        "quantity": "1 cup",
        "description": "Cooked",
        "category": "Grain"
      },
      {
        "name": "Feta cheese",
        "quantity": "1/2 cup",
        "description": "Crumbled",
        "category": "Dairy"
      },
      {
        "name": "Cucumber",
        "quantity": "1",
        "description": "Chopped",
        "category": "Vegetable"
      },
      {
        "name": "Olive oil",
        "quantity": "2 tablespoons",
        "description": "",
        "category": "Oil"
      },
      {
        "name": "Lemon juice",
        "quantity": "2 tablespoons",
        "description": "",
        "category": "Citrus"
      },
      {
        "name": "Salt",
        "quantity": "To taste",
        "description": "",
        "category": "Seasoning"
      }
    ],
    "steps": [
      "Combine cooked quinoa, feta cheese, and chopped cucumber in a large bowl.",
      "Add olive oil, lemon juice, and salt to taste.",
      "Toss the salad to combine the ingredients.",
      "Serve chilled."
    ],
    "dietary_considerations": [
      "Vegetarian",
      "Gluten-free"
    ],
    "timeToPrepare": "15 minutes",
    "difficulty": "Easy",
  },
  {
    "title": "Lentil Soup",
    "ingredients": [
      {
        "name": "Lentils",
        "quantity": "1 cup",
        "description": "Rinsed",
        "category": "Legume"
      },
      {
        "name": "Carrots",
        "quantity": "2",
        "description": "Chopped",
        "category": "Vegetable"
      },
      {
        "name": "Celery",
        "quantity": "2 stalks",
        "description": "Chopped",
        "category": "Vegetable"
      },
      {
        "name": "Onion",
        "quantity": "1",
        "description": "Chopped",
        "category": "Vegetable"
      },
      {
        "name": "Garlic",
        "quantity": "2 cloves",
        "description": "Minced",
        "category": "Seasoning"
      },
      {
        "name": "Olive oil",
        "quantity": "1 tablespoon",
        "description": "",
        "category": "Oil"
      },
      {
        "name": "Vegetable broth",
        "quantity": "4 cups",
        "description": "",
        "category": "Broth"
      }
    ],
    "steps": [
      "Heat olive oil in a large pot over medium heat.",
      "Add garlic, onion, carrots, and celery. Cook until softened.",
      "Add lentils and vegetable broth.",
      "Bring to a boil, then reduce heat and simmer for 20-25 minutes.",
      "Season with salt and pepper to taste.",
      "Serve hot."
    ],
    "dietary_considerations": [
      "Vegan",
      "Gluten-free"
    ],
    "timeToPrepare": "40 minutes",
    "difficulty": "Medium",
  },
  {
    "title": "Avocado Toast",
    "ingredients": [
      {
        "name": "Bread",
        "quantity": "2 slices",
        "description": "Toasted",
        "category": "Grain"
      },
      {
        "name": "Avocado",
        "quantity": "1",
        "description": "Mashed",
        "category": "Fruit"
      },
      {
        "name": "Salt",
        "quantity": "To taste",
        "description": "",
        "category": "Seasoning"
      },
      {
        "name": "Red pepper flakes",
        "quantity": "A pinch",
        "description": "",
        "category": "Seasoning"
      }
    ],
    "steps": [
      "Toast the bread slices until golden brown.",
      "Spread the mashed avocado on top of each toast.",
      "Sprinkle with salt and red pepper flakes.",
      "Serve immediately."
    ],
    "dietary_considerations": [
      "Vegan"
    ],
    "timeToPrepare": "5 minutes",
    "difficulty": "Easy",
  },
  {
    "title": "Spaghetti with Tomato Sauce",
    "ingredients": [
      {
        "name": "Spaghetti",
        "quantity": "200g",
        "description": "Cooked al dente",
        "category": "Grain"
      },
      {
        "name": "Tomato sauce",
        "quantity": "1 cup",
        "description": "",
        "category": "Sauce"
      },
      {
        "name": "Garlic",
        "quantity": "2 cloves",
        "description": "Minced",
        "category": "Seasoning"
      },
      {
        "name": "Olive oil",
        "quantity": "1 tablespoon",
        "description": "",
        "category": "Oil"
      },
      {
        "name": "Salt",
        "quantity": "To taste",
        "description": "",
        "category": "Seasoning"
      }
    ],
    "steps": [
      "Cook the spaghetti according to package instructions.",
      "In a saucepan, heat olive oil over medium heat.",
      "Add garlic and sauté for 1-2 minutes.",
      "Add tomato sauce and let it simmer for 5 minutes.",
      "Season with salt and mix with the cooked spaghetti.",
      "Serve immediately."
    ],
    "dietary_considerations": [
      "Vegetarian"
    ],
    "timeToPrepare": "20 minutes",
    "difficulty": "Easy",
  }
]

for recipy in recipies:
    updated_ingredients = []  # Lista para almacenar ingredientes con idProducto

    # Iterar sobre los ingredientes de la receta
    for ingredient in recipy['ingredients']:
        try:
            # Verificar o crear cada ingrediente (producto)
            response = requests.post(url_product, json={
                "name": ingredient['name'],
                "category": ingredient['category'],
                "beRecipy": False
            })

            if response.status_code == 201 or response.status_code == 200:
                product_data = response.json()

                # Agregar el idProducto al ingrediente
                ingredient['idProduct'] = product_data['product']['idProducto']
                updated_ingredients.append(ingredient)  # Añadir el ingrediente actualizado

                print(f"Producto '{ingredient['name']}' encontrado o creado exitosamente con id: {ingredient['idProduct']}.")
            else:
                print(f"Error al buscar o crear el producto '{ingredient['name']}': {response.text}")
        except Exception as e:
            print(f"Error al conectarse a la API para el producto '{ingredient['name']}': {str(e)}")

    # Reemplazar los ingredientes originales con los actualizados (que incluyen idProduct)
    recipy['ingredients'] = updated_ingredients
    recipy['bePublic'] = False
    recipy['madeBy'] = "GRKt2njSE4f6zqwaozHnwqTtpvU2"

    # Crear la receta después de verificar o crear los ingredientes
    try:
        response = requests.post(url, json=recipy)
        if response.status_code == 201:
            print(f"Receta '{recipy['title']}' creada exitosamente.")
        else:
            print(f"Error al crear la receta '{recipy['title']}': {response.text}")
    except Exception as e:
        print(f"Error al conectarse a la API para la receta '{recipy['title']}': {str(e)}")