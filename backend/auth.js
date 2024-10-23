// backend/auth.js
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


import { handleAuthError} from './authErrors';

export const signupUser = async (email, password, additionalData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: additionalData.name,
        createAt: new Date() 
      });
      console.log('Nuevo usuario registrado:', user.email);
  
      return user;
    } catch (error) {
      throw new Error(handleAuthError(message));
    }
  };