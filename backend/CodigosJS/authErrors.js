//backend/authErrors.js
export const handleAuthError = (error) => {
  // Mapa de errores con el código como clave y el mensaje como valor
  const errorMessages = {
    'auth/email-already-in-use': 'This email is already in use.',
    'auth/invalid-email': 'Email not valid.',
    'auth/user-not-found': 'User not found.',
    'auth/wrong-password': 'Wrong email or password.',
    
  };

  return errorMessages[error.message] || 'Unexpected error occurred. Please try again later.';
};