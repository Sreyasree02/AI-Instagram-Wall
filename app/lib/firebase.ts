import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuqVvGGX_2-y2g1RVYwhv1HRXbnx2MH_Q",
  authDomain: "instagram-reels-sreyasre-18e69.firebaseapp.com",
  projectId: "instagram-reels-sreyasre-18e69",
  storageBucket: "instagram-reels-sreyasre-18e69.firebasestorage.app",
  messagingSenderId: "504595732985",
  appId: "1:504595732985:web:2f7a8d10ad2484990cc528",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);