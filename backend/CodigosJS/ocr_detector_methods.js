const detectImage = async (imageFile) => {
    const url = 'http://localhost:5001/api/detect';
  
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
  
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Server response:', data);
      } else {
        console.error(`Request error: ${response.status} - ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  
  const extractTextFromImage = async (imageFile) => {
    const url = 'http://localhost:5001/api/ocr';
  
    try {
      const formData = new FormData();
      formData.append('image', imageFile); // Match the expected field name in the API
  
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Server response:', data);
      } else {
        console.error(`Request error: ${response.status} - ${data.error}`);
      }
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  