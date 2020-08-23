import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
   apiKey: "AIzaSyCp5dLpv4KOo4E_ad9bqxQheIYZciB-nOM",
   authDomain: "shop-app-dc0ab.firebaseapp.com",
   databaseURL: "https://shop-app-dc0ab.firebaseio.com",
   projectId: "shop-app-dc0ab",
   storageBucket: "shop-app-dc0ab.appspot.com",
   messagingSenderId: "873287756562",
   appId: "1:873287756562:web:c131d14e19dd6162e121cb",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;

   const userRef = firestore.doc(`users/${userAuth.uid}`);

   const snapShot = await userRef.get();

   if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
         await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData,
         });
      } catch (error) {
         console.log("error creating user", error.message);
      }
   }

   return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
