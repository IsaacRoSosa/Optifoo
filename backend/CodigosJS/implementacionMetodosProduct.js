const createRecipy = async (
  title,
  ingredients,
  timeToPrepare,
  bePublic,
  madeBy,
  steps
) => {
  try {
    const updatedIngredients = await Promise.all(
      ingredients.map(async (ingredient) => {
        const idProducto = await getProductOrCreate(
          ingredient.name,
          ingredient.category,
          false
        );
        return {
          ...ingredient,
          idProduct: idProducto,
        };
      })
    );

    const response = await fetch("http://localhost:5001/api/addrecipy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        ingredients: updatedIngredients,
        timeToPrepare: timeToPrepare,
        bePublic: bePublic,
        madeBy: madeBy,
        steps: steps,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Receta creada:", data);
    } else {
      console.error("Error al crear la receta:", data.error);
    }
  } catch (error) {
    console.error("Error inesperado:", error);
  }
};

const getProductOrCreate = async (name, category, beRecipy) => {
  try {
    const response = await fetch(
      "http://localhost:5001/api/getproduct_or_create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          category: category,
          beRecipy: beRecipy,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Producto encontrado o creado:", data.product);
      return data.product.idProducto;
    } else {
      console.error("Error al buscar o crear el producto:", data.error);
    }
  } catch (error) {
    console.error("Error inesperado:", error);
  }
};

const getProductById = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:5001/api/getproduct/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Producto obtenido:", data.product);
    } else {
      console.error("Error al obtener el producto:", data.error);
    }
  } catch (error) {
    console.error("Error inesperado:", error);
  }
};

const getAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/getproducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Productos obtenidos:", data.products);
    } else {
      console.error("Error al obtener los productos:", data.error);
    }
  } catch (error) {
    console.error("Error inesperado:", error);
  }
};

const updateProduct = async (productId, updatedData) => {
  try {
    const response = await fetch(
      `http://localhost:5001/api/updateproduct/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Producto actualizado:", data.product);
    } else {
      console.error("Error al actualizar el producto:", data.error);
    }
  } catch (error) {
    console.error("Error inesperado:", error);
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:5001/api/removeproduct/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Producto eliminado:", data.message);
    } else {
      console.error("Error al eliminar el producto:", data.error);
    }
  } catch (error) {
    console.error("Error inesperado:", error);
  }
};
