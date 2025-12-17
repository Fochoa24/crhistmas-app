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
        <form onSubmit={handleSubmit} className="member-form">
            <input
                type="text"
                placeholder="Nombre del integrante (ej. Mamá)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="member-input"
            />
            <button type="submit" className="btn-primary">
                Agregar
            </button>
        </form>
    );
}
