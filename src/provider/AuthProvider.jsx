import React, { useEffect } from 'react';
import {getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { createContext } from 'react';
import {app} from '../firebase/firebase.init';

export const AuthContext=createContext();
const auth=getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    

    const authInfo={
          user
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