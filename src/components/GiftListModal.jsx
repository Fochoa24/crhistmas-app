import { useState } from 'react';
import { AISuggestionBox } from './AISuggestionBox';
import { WhatsAppButton } from './WhatsAppButton';

export function GiftListModal({ member, onClose, onAddGift, onRemoveGift, onToggleGift }) {
    const [giftText, setGiftText] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (!giftText.trim()) return;
        onAddGift(member.id, giftText);
        setGiftText('');
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(3px)'
        }} onClick={onClose}>
            <div style={{
                background: 'var(--white)',
                padding: '2rem',
                borderRadius: 'var(--radius)',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '80vh',
                overflowY: 'auto',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                    }}
                >
                    ×
                </button>

                <h2 style={{ textAlign: 'center', color: 'var(--primary)' }}>Regalos para {member.name}</h2>

                <WhatsAppButton memberName={member.name} gifts={member.gifts} />

                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Nuevo regalo..."
                        value={giftText}
                        onChange={(e) => setGiftText(e.target.value)}
                        className="gift-input"
                    />
                    <button type="submit" className="btn-primary">+</button>
                </form>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {member.gifts.length === 0 && (
                        <li style={{ textAlign: 'center', color: 'var(--gray)', padding: '1rem' }}>
                            No hay regalos en la lista aún.
                        </li>
                    )}
                    {member.gifts.map(gift => (
                        <li key={gift.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.5rem',
                            background: 'var(--gray-light)',
                            borderRadius: 'var(--radius-sm)',
                            textDecoration: gift.completed ? 'line-through' : 'none',
                            opacity: gift.completed ? 0.6 : 1
                        }}>
                            <input
                                type="checkbox"
                                checked={gift.completed}
                                onChange={() => onToggleGift(member.id, gift.id)}
                                style={{ marginRight: '1rem', width: 'auto' }}
                            />
                            <span style={{ flex: 1 }}>{gift.text}</span>
                            <button
                                onClick={() => onRemoveGift(member.id, gift.id)}
                                className="btn-icon"
                                style={{ color: 'var(--danger)' }}
                            >
                                🗑️
                            </button>
                        </li>
                    ))}
                </ul>

                <AISuggestionBox
                    memberName={member.name}
                    onAddGift={(text) => onAddGift(member.id, text)}
                />
            </div>
        </div>
    );
}
