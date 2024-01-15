import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeba8ruXIQvkiCWqNvFIqHIWQF2FbcV1c",
  authDomain: "data-b6388.firebaseapp.com",
  projectId: "data-b6388",
  storageBucket: "data-b6388.appspot.com",
  messagingSenderId: "796371404773",
  appId: "1:796371404773:web:5a424c9e0617bec292510c",
};
export default firebaseConfig;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const filebaseApp = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(filebaseApp);
