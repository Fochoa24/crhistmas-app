import { useState } from 'react';
import { getGiftSuggestions } from '../services/ai';

export function AISuggestionBox({ memberName, onAddGift }) {
    const [interests, setInterests] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSuggest = async (e) => {
        e.preventDefault();
        if (!interests.trim()) return;

        setLoading(true);
        setError(null);
        setSuggestions([]);

        try {
            const results = await getGiftSuggestions(memberName, interests);
            setSuggestions(results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'var(--light)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--secondary)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>✨</span>
                <h3 style={{ margin: 0, color: 'var(--secondary)', fontSize: '1.2rem', fontWeight: 600 }}>
                    Sugerencias Mágicas (IA)
                </h3>
            </div>

            <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: 'var(--gray)' }}>
                Escribe qué le gusta a {memberName} y te daré ideas únicas:
            </p>

            <form onSubmit={handleSuggest} className="suggestion-form">
                <input
                    type="text"
                    placeholder="Ej: Le gusta cocinar, el fútbol, leer..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="suggestion-input"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="btn-primary"
                    style={{
                        background: 'var(--secondary)',
                        padding: '0.8rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        whiteSpace: 'nowrap'
                    }}
                    disabled={loading}
                >
                    {loading ? (
                        <>⏳ Pensando...</>
                    ) : (
                        <>💡 Sugerir</>
                    )}
                </button>
            </form>

            {error && (
                <div style={{
                    padding: '1rem',
                    background: '#fee2e2',
                    color: '#dc2626',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    marginBottom: '1rem'
                }}>
                    ⚠️ {error}
                </div>
            )}

            {suggestions.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeIn 0.5s ease' }}>
                    {suggestions.map((item, index) => (
                        <div key={index} style={{
                            background: 'var(--white)',
                            padding: '1.2rem',
                            borderRadius: 'var(--radius)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            borderLeft: '4px solid var(--secondary)',
                            transition: 'transform 0.2s',
                            cursor: 'default'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <div style={{ flex: 1 }}>
                                    <strong style={{ fontSize: '1.1rem', color: 'var(--dark)', display: 'block' }}>{item.name}</strong>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem', flexWrap: 'wrap' }}>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            background: '#e0f2fe',
                                            color: '#0369a1',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '12px',
                                            fontWeight: 600,
                                        }}>
                                            {item.price}
                                        </span>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            background: '#f0fdf4',
                                            color: '#15803d',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '12px',
                                            fontWeight: 600,
                                        }}>
                                            📍 {item.store}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '1rem', lineHeight: '1.5' }}>
                                {item.reason}
                            </p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => onAddGift(`${item.name} (${item.store})`)}
                                    style={{
                                        flex: 1,
                                        padding: '0.6rem',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: 'var(--radius-sm)',
                                        fontWeight: 600,
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'opacity 0.2s'
                                    }}
                                >
                                    + Agregar
                                </button>
                                <button
                                    onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(item.name + ' ' + item.store + ' chile')}`, '_blank')}
                                    style={{
                                        padding: '0.6rem 1rem',
                                        background: 'var(--gray-light)',
                                        color: 'var(--dark)',
                                        borderRadius: 'var(--radius-sm)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.1rem'
                                    }}
                                    title="Buscar en Google"
                                >
                                    🔍
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
