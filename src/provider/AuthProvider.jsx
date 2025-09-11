import React, { useEffect } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { createContext } from 'react';
import {app} from '../firebase/firebase.init';

export const AuthContext=createContext();
const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const emailSignUp=(email,pass)=>{
      return createUserWithEmailAndPassword(auth,email,pass);
    }
    const googleSignIn=()=>{
      return signInWithPopup(auth,googleProvider);
    }
    const emaillogin=(email,password)=>{
      return signInWithEmailAndPassword(auth,email,password);
    }
    const forgetPassword=(email)=>{
      return sendPasswordResetEmail(auth,email)
    }
    const logOut=()=>{
      return signOut(auth);
    }
    const authInfo={
          user,
          emailSignUp,
          googleSignIn,
          emaillogin,
          forgetPassword,
          logOut,
    }
    useEffect(()=>{
         const unsubscribe=onAuthStateChanged(auth,currentUser=>{
          setUser(currentUser);
         })
          return ()=>unsubscribe();
         }
    ,[])
  return (
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
  );
}

export default AuthProvider;