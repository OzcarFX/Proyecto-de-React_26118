
// Importo la función para inicializar la app y la base de datos Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// credenciales (react26118)
const firebaseConfig = {
  apiKey: "AIzaSyAk91CC4RKLNLc8XjKIL5Ib5mJ6GZycNrg",
  authDomain: "react26118.firebaseapp.com",
  projectId: "react26118",
  storageBucket: "react26118.firebasestorage.app",
  messagingSenderId: "481744433437",
  appId: "1:481744433437:web:c60c3ad13311254727f1f4"
};

// Se inicia la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Se exporta tanto la app (para Auth) como db (para Firestore)
export { app };
export const db = getFirestore(app);