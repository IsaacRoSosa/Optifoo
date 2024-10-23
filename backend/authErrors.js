//backend/authErrors.js
export const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/invalid-email':
        return 'Email not valid.';
      case 'auth/user-not-found':
        return 'User not found.';
      case 'auth/wrong-password':
        return 'Wrong email or password.';
      default:
        return error.message;
    }
};