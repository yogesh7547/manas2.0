import { auth } from './firebase.ts'
import {type UserCredential, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


export const doCreateUserWithEmailAndPassword= async (email:string, password:string): Promise<UserCredential>=>{
     return await createUserWithEmailAndPassword(auth, email, password);
}

export const doSignInWIthEmailAndPassword= (email:string, password:string)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

export const doSignInWithGoolge= async ()=>{
    const provider=  new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    
    // could also store the users info in firestore

    return result;
};


export const doSignOut= ()=>{
    return auth.signOut();
}