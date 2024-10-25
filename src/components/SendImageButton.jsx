import React from 'react';

const SendImageButton = ({ imageFile, onClickFunction, buttonText }) => {
  const handleClick = () => {
    event.preventDefault();
    if (!imageFile) {
      alert('No image provided. Please select an image.');
      return;
    }
    onClickFunction(imageFile);
  };

  const styles = {
    button: {
      backgroundColor: '#4CAF50',
      border: 'none',
      color: 'black',
      padding: '15px 32px',
      textAlign: 'center',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px',
      margin: '10px',
    },
  };

  return (
    <button style={styles.button} onClick={handleClick}>
      {buttonText}
    </button>
  );
};

export default SendImageButton;
