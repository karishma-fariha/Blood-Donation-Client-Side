import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth, AuthContext, googleProvider } from './AuthContext';

const AuthProvider = ({children}) => {
    const [user,setUser] =useState({})
        const [loading, setLoading] = useState(true);
      const [emailForReset, setEmailForReset] = useState(""); 

    // console.log(user,loading)

    // forget password
    

    // login with google
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    // create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // login
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    // logout
    const logout = () => {
        return signOut(auth);
    }
    // update profile
    const updateUser = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }

    // observer


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    const authData = {
        user,
        setUser,
        createUser,
        logout,
        login,
        loading,
        setLoading,
        updateUser,
        googleLogin,
        emailForReset,
        setEmailForReset,
    }
    return <AuthContext value={authData}>{children}</AuthContext>
};

export default AuthProvider;