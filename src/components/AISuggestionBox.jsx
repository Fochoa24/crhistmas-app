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
            background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
            borderRadius: 'var(--radius)',
            border: '2px solid var(--secondary)'
        }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary)' }}>
                ✨ Sugerencias Mágicas (IA)
            </h3>

            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--gray)' }}>
                ¿No sabes qué regalar? Cuéntame qué le gusta a {memberName}.
            </p>

            <form onSubmit={handleSuggest} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="ej. Cocinar, Harry Potter, Tecnología..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    style={{ flex: 1 }}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="btn-primary"
                    style={{ background: 'var(--secondary)' }}
                    disabled={loading}
                >
                    {loading ? 'Pensando...' : 'Sugerir'}
                </button>
            </form>

            {error && <p style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{error}</p>}

            {suggestions.length > 0 && (
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {suggestions.map((item, index) => (
                        <li key={index} style={{
                            background: 'var(--white)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-sm)',
                            boxShadow: 'var(--shadow)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <strong style={{ fontSize: '1.1rem' }}>{item.name}</strong>
                                <span style={{ fontSize: '0.8rem', background: '#eee', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>
                                    {item.priceRange}
                                </span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--dark)' }}>{item.reason}</p>
                            <button
                                onClick={() => onAddGift(item.name)}
                                className="btn-primary"
                                style={{ alignSelf: 'flex-start', fontSize: '0.9rem', padding: '0.3rem 0.8rem' }}
                            >
                                + Agregar a la lista
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
