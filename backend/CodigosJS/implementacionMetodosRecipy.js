const createRecipy = async (ingredients, timeToPrepare, bePublic, madeBy) => {
    try {
      const response = await fetch('http://localhost:5001/api/addrecipy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredients,
          timeToPrepare: timeToPrepare,
          bePublic: bePublic,
          madeBy: madeBy
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Receta creada:', data.recipy);
      } else {
        console.error('Error al crear la receta:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
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
        console.log('Receta obtenida:', data.recipy);
      } else {
        console.error('Error al obtener la receta:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
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
        console.log('Recetas obtenidas:', data.recipies);
      } else {
        console.error('Error al obtener las recetas:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
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
        console.log('Receta actualizada:', data.recipy);
      } else {
        console.error('Error al actualizar la receta:', data.error);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
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
  