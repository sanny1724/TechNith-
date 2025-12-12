import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Optional: Token expiration check
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    // In a real app you might fetch the user profile here
                    setUser(decoded); // or simplified user object from login
                    // Ideally we'd call /auth/me to get fresh user data
                    api.get('/auth/me').then(res => setUser(res.data)).catch(() => logout());
                }
            } catch (error) {
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const register = async (userData) => {
        const res = await api.post('/auth/register', userData);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const loginWithGoogle = async (token) => {
        const res = await api.post('/auth/google', { token });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loginWithGoogle, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
