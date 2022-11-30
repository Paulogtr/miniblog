
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBhxlmH1kq4sM8t1tP8AUZyMXn-cMqq0F8",
  authDomain: "miniblog-4e756.firebaseapp.com",
  projectId: "miniblog-4e756",
  storageBucket: "miniblog-4e756.appspot.com",
  messagingSenderId: "748986226050",
  appId: "1:748986226050:web:f0d604f902e2120b33ab9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}