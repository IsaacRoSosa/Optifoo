// backend/login.js
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
    } catch (error) {
      throw new Error(handleAuthError(error)); 
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
        console.log('Nuevo usuario registrado:', user.email);
      }

      return user;
    } catch (error) {
      throw new Error(handleAuthError(error));
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
        console.log('Nuevo usuario registrado con GitHub:', user.email);
      }

      return user;
    } catch (error) {
      throw new Error(handleAuthError(error));
    }
};

  