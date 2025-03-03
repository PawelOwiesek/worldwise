import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_APP_FIREBASE_AUTH_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_API_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_API_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getCities = async (id) => {
  const querySnapshot = await getDocs(collection(db, "cities"));
  const cities = querySnapshot.docs.map((doc) => doc.data());
  if (id) {
    return cities.find((city) => city.id === id) || null;
  }

  return cities;
};

export { db };
