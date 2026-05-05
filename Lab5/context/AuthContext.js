import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const register = (email, password, name) => {
        const newUser = { email, password, name };
        setUserList((prev) => [...prev, newUser]);
        setCurrentUser(newUser);
        setIsAuthenticated(true);
    };

    const login = (email, password) => {
        const found = userList.find(
            (u) => u.email === email && u.password === password
        );
        if (found) {
            setCurrentUser(found);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
