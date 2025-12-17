import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export function Login() {
    const { loginWithGoogle } = useAuth();
    const [error, setError] = useState(null);

    // Detect In-App Browser (safe for SSR check)
    const isBrowser = typeof navigator !== 'undefined';
    const ua = isBrowser ? (navigator.userAgent || navigator.vendor || window.opera) : '';
    const isInApp = isBrowser && /FBAN|FBAV|Instagram|WhatsApp/i.test(ua);

    const handleLogin = async () => {
        try {
            setError(null);
            await loginWithGoogle();
        } catch (err) {
            console.error(err);
            let msg = "No se pudo iniciar sesión. Verifica tu conexión.";
            if (err.code === 'auth/popup-blocked') {
                msg = "El navegador bloqueó la ventana emergente. Intenta de nuevo.";
            }
            if (isInApp) {
                msg += " Estás en un navegador integrado que no soporta Google Login.";
            }
            setError(msg);
        }
    };

    const handleCopyLink = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            alert('Enlace copiado al portapapeles. Pégalo en Chrome o Safari.');
        } else {
            alert('No se pudo copiar. Por favor copia la URL manualmente.');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--background)',
            padding: '1rem'
        }}>
            <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%'
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎄</div>
                <h1 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Bienvenido</h1>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                    Organiza tus regalos de Navidad en familia. Inicia sesión para guardar tus listas.
                </p>

                {isInApp && (
                    <div style={{
                        background: '#fff3cd',
                        color: '#856404',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        border: '1px solid #ffeeba',
                        textAlign: 'left'
                    }}>
                        <strong>⚠️ Atención:</strong> Estás usando un navegador integrado (WhatsApp/Instagram).
                        <br /><br />
                        Es posible que el inicio de sesión con Google falle.
                        <br />
                        Por favor, abre esta página en tu navegador del sistema (Safari o Chrome).
                        <br />
                        <i>(Pulsa los 3 puntos y elige "Abrir en el navegador")</i>
                    </div>
                )}

                {isInApp ? (
                    <button
                        onClick={handleCopyLink}
                        style={{
                            background: '#25D366', // WhatsApp green-ish
                            border: 'none',
                            color: 'white',
                            padding: '1rem',
                            width: '100%',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        📋 Copiar Enlace para Navegador
                    </button>
                ) : (
                    <button
                        onClick={handleLogin}
                        style={{
                            background: 'white',
                            border: '1px solid #ccc',
                            color: '#333',
                            padding: '1rem',
                            width: '100%',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            transition: 'background 0.2s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.background = '#f9f9f9'}
                        onMouseLeave={(e) => e.target.style.background = 'white'}
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            style={{ width: '24px', height: '24px' }}
                        />
                        Continuar con Google
                    </button>
                )}

                {error && (
                    <p style={{ color: 'red', marginTop: '1rem', fontSize: '0.9rem' }}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}
