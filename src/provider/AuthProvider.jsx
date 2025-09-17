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
    const [loading,setLoading]=useState(true)
    const emailSignUp=(email,pass)=>{
      setLoading(true);
      return createUserWithEmailAndPassword(auth,email,pass);
    }
    const googleSignIn=()=>{
      setLoading(true);
      return signInWithPopup(auth,googleProvider);
    }
    const emaillogin=(email,password)=>{
      setLoading(true);
      return signInWithEmailAndPassword(auth,email,password);
    }
    const forgetPassword=(email)=>{
      setLoading(true);
      return sendPasswordResetEmail(auth,email)
    }
    const logOut=()=>{
      setLoading(true);
      return signOut(auth);
    }
    const authInfo={
          user,
          emailSignUp,
          googleSignIn,
          emaillogin,
          forgetPassword,
          logOut,
          loading,
    }
    useEffect(()=>{
         const unsubscribe=onAuthStateChanged(auth,currentUser=>{
          setUser(currentUser);
          setLoading(false);
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