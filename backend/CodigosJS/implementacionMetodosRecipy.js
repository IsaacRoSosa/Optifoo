const createRecipy = async (title, ingredients, timeToPrepare, bePublic, madeBy,categories, steps) => {
    try {
      const response = await fetch('http://localhost:5001/api/addrecipy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          ingredients: ingredients,
          timeToPrepare: timeToPrepare,
          bePublic: bePublic,
          madeBy: madeBy,
          categories: categories,
          steps: steps
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Receta creada:');
      } else {
        console.error('Error al crear la receta:');
      }
    } catch (error) {
      console.error('Error inesperado:');
    }
  };
  

  const getRecipyById = async (recipyId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/getrecipy/${recipyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Receta obtenida:');
      } else {
        console.error('Error al obtener la receta:');
      }
    } catch (error) {
      console.error('Error inesperado:');
    }
  };


  const getAllRecipies = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/getrecipies', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Recetas obtenidas:');
      } else {
        console.error('Error al obtener las recetas:');
      }
    } catch (error) {
      console.error('Error inesperado:');
    }
  };
  
  const updateRecipy = async (recipyId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5001/api/updaterecipy/${recipyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Receta actualizada:');
      } else {
        console.error('Error al actualizar la receta:');
      }
    } catch (error) {
      console.error('Error inesperado:');
    }
  };
  

const deleteRecipy = async (recipyId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/removerecipy/${recipyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
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
  