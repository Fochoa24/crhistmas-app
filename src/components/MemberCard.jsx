export function MemberCard({ member, onRemove, onClick }) {
    const giftCount = member.gifts.length;
    const pendingCount = member.gifts.filter(g => !g.completed).length;

    return (
        <div
            onClick={onClick}
            style={{
                background: 'var(--white)',
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                cursor: 'pointer',
                transition: 'var(--transition)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                minHeight: '150px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <button
                onClick={(e) => { e.stopPropagation(); onRemove(member.id); }}
                className="btn-icon"
                style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', fontSize: '1.2rem' }}
                title="Eliminar integrante"
            >
                ×
            </button>

            <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '0.5rem'
            }}>
                {member.name.charAt(0).toUpperCase()}
            </div>

            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{member.name}</h3>

            <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                {giftCount === 0 ? 'Sin regalos' : `${pendingCount} pendientes`}
            </p>
        </div>
    );
}
