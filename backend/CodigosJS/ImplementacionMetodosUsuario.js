/*Metodos para agregar una o mas alergias a un usuario*/ 
const addAllergyToUser = async (userId, newAllergy) => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/${userId}/update_allergies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          allergies: newAllergy,  
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Alergia añadida:', data.message);
      } else {
        console.error('Error al añadir la alergia:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
};

const addAllergiesToUser = async (userId, newAllergies) => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/${userId}/update_allergies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          allergies: newAllergies,  
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Alergias añadidas:', data.message);
      } else {
        console.error('Error al añadir las alergias:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
};
  

/* Metodos para agregar dietas a un usuario*/
const addDietToUser = async (userId, newDiet) => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/${userId}/update_diets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diets: newDiet,  
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Dieta añadida:', data.message);
      } else {
        console.error('Error al añadir la dieta:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
};
  

const addDietsToUser = async (userId, newDiets) => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/${userId}/update_diets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          diets: newDiets,  
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Dietas añadidas:', data.message);
      } else {
        console.error('Error al añadir las dietas:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
};
  
/* Metodo para agregar un producto o varios productos a un usuario*/
const updateProductsToUser = async (userId, products) => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/${userId}/update_products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: products  
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Productos actualizados o añadidos correctamente:', data.message);
      } else {
        console.error('Error al actualizar o añadir los productos:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
};

/* Metodos para agregar dietas a un usuario*/
const addRecipeToUser = async (userId, newRecipe) => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/${userId}/update_recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipes: newRecipe,  
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Receta añadida:', data.message);
      } else {
        console.error('Error al añadir la receta:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
};
  
const addMultipleRecipesToUser = async (userId, newRecipes) => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/${userId}/update_recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipes: newRecipes,  
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Recetas añadidas:', data.message);
      } else {
        console.error('Error al añadir las recetas:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
};


/*Metodo para quitar un alergia*/
const deleteAllergyFromUser = async (userId, allergy) => {
  try {
    const response = await fetch(`http://localhost:5001/api/user/${userId}/delete_allergy`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        allergy: allergy,  
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Alergia eliminada:', data.message);
    } else {
      console.error('Error al eliminar la alergia:', data.error);
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
};

/*Metodo para quitar una dieta*/
const deleteDietFromUser = async (userId, diet) => {
  try {
    const response = await fetch(`http://localhost:5001/api/user/${userId}/delete_diet`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        diet: diet,  // Enviar la dieta a eliminar
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Dieta eliminada:', data.message);
    } else {
      console.error('Error al eliminar la dieta:', data.error);
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
};

/*Metodo para borrar un producto*/
const deleteProductFromUser = async (userId, productId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/user/${userId}/delete_product`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productId,  
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Producto eliminado:', data.message);
    } else {
      console.error('Error al eliminar el producto:', data.error);
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
};

/*Metodo para borrar una receta*/
const deleteRecipeFromUser = async (userId, recipe) => {
  try {
    const response = await fetch(`http://localhost:5001/api/user/${userId}/delete_recipe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipe: recipe,  
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Receta eliminada:', data.message);
    } else {
      console.error('Error al eliminar la receta:', data.error);
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
};

const getAllergiesFromUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/user/${userId}/get_allergies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Alergias del usuario:', data.allergies);
    } else {
      console.error('Error al obtener las alergias:', data.error);
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
};


const getDietsFromUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/user/${userId}/get_diets`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Dietas del usuario:', data.diets);
    } else {
      console.error('Error al obtener las dietas:', data.error);
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
};


const getProductsFromUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/user/${userId}/get_products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Productos del usuario:', data.products);
    } else {
      console.error('Error al obtener los productos:', data.error);
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
};


const getRecipesFromUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5001/api/user/${userId}/get_recipes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Recetas del usuario:', data.recipes);
    } else {
      console.error('Error al obtener las recetas:', data.error);
    }
  } catch (error) {
    console.error('Error inesperado:', error);
  }
};
