import { useEffect, useState } from 'react';
import { signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const loginWithGoogleRedirect = () => {
        return signInWithRedirect(auth, googleProvider);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        getRedirectResult(auth).catch((error) => {
            console.error("Error en redirect de Auth:", error);
            // Podríamos setear un error en el estado si fuera necesario,
            // pero por ahora solo lo logueamos.
        });
    }, []);

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--background)'
            }}>
                <div style={{ fontSize: '2rem' }}>🎄 Cargando...</div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ currentUser, loginWithGoogle, loginWithGoogleRedirect, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
