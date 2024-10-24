import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { handleAuthError } from "./authErrors.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); 
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider(); 

const server = express();
server.use(cors());
server.use(express.json());

// Ruta para crear usuario (signup)
server.post('/api/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
        email: String(email),  
        name: name, 
        createdAt: Timestamp.now(),
        allergies: [],
        diets: [],
        products: [], 
        recipies: []
    });

    res.json({ user });
  } 
  catch (error) {
    const safeErrorMessage = handleAuthError(error);  
    console.log('Error en el registro:', safeErrorMessage);  // Log del error que ocurrió
    
    res.status(400).json({ error: 'Error al crear usuario. Verifica los datos.' });
  }
});


// Ruta para iniciar sesión (login)
server.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    res.json({ user: userCredential.user });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(400).json({ error: 'Error en el login. Verifica tus credenciales.' });
  }
});

// Ruta para iniciar sesión con Google
server.post('/api/login/google', async (req, res) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const isNewUser = result.additionalUserInfo.isNewUser;

    if (isNewUser) {
        await setDoc(doc(db, 'users', user.uid), {
          email: String(email),  
          name: name, 
          createdAt: Timestamp.now(),
          allergies: [],
          diets: [],
          products: [], 
          recipies: []
      });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error en el login con Google:', error);
    res.status(400).json({ error: 'Error al iniciar sesión con Google.' });
  }
});

// Ruta para iniciar sesión con GitHub
server.post('/api/login/github', async (req, res) => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;

    const isNewUser = result.additionalUserInfo.isNewUser;

    if (isNewUser) {
        await setDoc(doc(db, 'users', user.uid), {
          email: String(email),  
          name: name, 
          createdAt: Timestamp.now(),
          allergies: [],
          diets: [],
          products: [], 
          recipies: []
      });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error en el login con GitHub:', error);
    res.status(400).json({ error: 'Error al iniciar sesión con GitHub.' });
  }
});

server.listen(5001, () => {
  console.log('API intermediaria corriendo en el puerto 5001');
});
