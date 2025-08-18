// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4bWys3atCjlPJBeLx1uKy3Yaf-GNxOkM",
  authDomain: "healthsupport-f5720.firebaseapp.com",
  projectId: "healthsupport-f5720",
  storageBucket: "healthsupport-f5720.firebasestorage.app",
  messagingSenderId: "801597083107",
  appId: "1:801597083107:web:c4931efdd55ecc409424d6",
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
export default firebase_app;
