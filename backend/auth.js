// backend/auth.js
import { auth, db} from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { handleAuthError} from './authErrors';
import { Timestamp } from 'firebase/firestore'; 

export const signupUser = async (email, password, additionalData) => {
  try {

    // Crear usuario con email y contraseña
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const name = String(additionalData.name);

    // Guardar info en base de datos
    await setDoc(doc(db, 'users', user.uid), {
      email: String(email),  
      name: name, 
      createdAt: Timestamp.now(), 
    });

  
    return user;
  } catch (error) {
    const safeErrorMessage = handleAuthError(error);  
    console.log('Error en el registro:', safeErrorMessage); 
    return safeErrorMessage;
  }
};
