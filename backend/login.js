// backend/login.js
import { auth, googleProvider, githubProvider, db } from './firebase'; // Importamos los proveedores y Firestore
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Para guardar en Firestore
import { handleAuthError } from './authErrors'; // Manejador de errores

// Iniciar sesión con email y contraseña
export const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } 
    catch (error) {
      const safeErrorMessage = handleAuthError(error);  
      console.log('Error en el login:', safeErrorMessage); 
      return safeErrorMessage;
    }
};

// Iniciar sesión con Google
export const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Verificamos si el usuario es nuevo
      const isNewUser = result.additionalUserInfo.isNewUser;
      
      if (isNewUser) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: user.displayName, 
          createdAt: new Date() 
        });
      }

      return user;
    } 
    catch (error) {
      const safeErrorMessage = handleAuthError(error);  
      console.log('Error en el registro o login:', safeErrorMessage); 
      return safeErrorMessage;
    }
};

export const loginWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      const isNewUser = result.additionalUserInfo.isNewUser;
      
      if (isNewUser) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: user.displayName || 'Usuario de GitHub', 
          githubUsername: result.additionalUserInfo.username,
          createdAt: new Date() 
        });
      }

      return user;
    } catch (error) {
      const safeErrorMessage = handleAuthError(error);  
      console.log('Error en el registro:', safeErrorMessage); 
      return safeErrorMessage;
    }
};

  