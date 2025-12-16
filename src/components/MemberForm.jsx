import { useState } from 'react';

export function MemberForm({ onAdd }) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name);
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            maxWidth: '500px',
            margin: '0 auto 2rem auto'
        }}>
            <input
                type="text"
                placeholder="Nombre del integrante (ej. Mamá)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ flex: 1 }}
            />
            <button type="submit" className="btn-primary">
                Agregar
            </button>
        </form>
    );
}
