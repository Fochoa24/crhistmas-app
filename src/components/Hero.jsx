
export function Hero({ currentUser, onLogout }) {
    return (
        <div className="hero-section">
            <nav className="hero-nav">
                <div className="logo-container">
                    <span className="logo-icon">🎄</span>
                    <span className="logo-text">ChristmasWish</span>
                </div>
                <div className="user-controls">
                    <span className="user-greeting">
                        Hola, <strong>{currentUser.displayName?.split(' ')[0]}</strong>
                    </span>
                    <button onClick={onLogout} className="logout-btn">
                        Salir
                    </button>
                </div>
            </nav>

            <div className="hero-content">
                <div className="hero-badge">✨ La Magia de la Navidad</div>
                <h1 className="hero-title">
                    Organiza tus <br />
                    <span className="text-gradient">Regalos Soñados</span>
                </h1>
                <p className="hero-subtitle">
                    Crea listas mágicas, recibe sugerencias con IA y comparte la alegría con tu familia.
                </p>
            </div>

            <div className="hero-decorations">
                <div className="snow-flake">❄️</div>
                <div className="snow-flake">❄️</div>
                <div className="snow-flake">❄️</div>
            </div>
        </div>
    );
}
