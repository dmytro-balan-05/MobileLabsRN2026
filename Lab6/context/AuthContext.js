import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return unsubscribe; // відписуємось при розмонтуванні
    }, []);

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const register = async (email, password) => {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', credential.user.uid), {
            email,
            name: '',
            age: '',
            city: '',
            createdAt: new Date(),
        });
        return credential;
    };

    const logout = () => signOut(auth);

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    const value = {
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
