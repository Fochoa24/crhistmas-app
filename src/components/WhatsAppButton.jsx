export function WhatsAppButton({ memberName, gifts }) {
    const handleShare = () => {
        // Unicode characters for better compatibility
        const emoji = {
            gift: '\u{1F381}',
            sparkles: '\u{2728}',
            check: '\u{2705}',
            square: '\u{2B1C}',
            santa: '\u{1F385}',
            memo: '\u{1F4DD}',
            bulb: '\u{1F4A1}',
            bullet: '\u{2022}'
        };

        let text = `${emoji.gift} *Lista de Regalos de ${memberName}* ${emoji.gift}\n\n`;

        const pendingGifts = gifts.filter(g => !g.completed);
        const completedGifts = gifts.filter(g => g.completed);

        if (gifts.length === 0) {
            text += `${emoji.memo} *¡La lista está vacía!*\nAyúdame con algunas ideas navideñas. ${emoji.bulb}\n`;
        } else {
            if (pendingGifts.length > 0) {
                text += `${emoji.sparkles} *Pendientes:*\n`;
                pendingGifts.forEach(gift => {
                    text += `${emoji.bullet} ${emoji.square} ${gift.text}\n`;
                });
                text += "\n";
            }

            if (completedGifts.length > 0) {
                text += `${emoji.check} *Comprados/Listos:*\n`;
                completedGifts.forEach(gift => {
                    text += `${emoji.bullet} ~${gift.text}~\n`;
                });
                text += "\n";
            }
        }

        text += `${emoji.santa} _Organizado con App Navidad_`;

        const encodedText = encodeURIComponent(text);
        // Using api.whatsapp.com is often more reliable for encoding than wa.me
        window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
    };

    return (
        <button
            onClick={handleShare}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                background: '#25D366', // WhatsApp Brand Color
                color: 'white',
                border: 'none',
                padding: '0.8rem 1.2rem',
                borderRadius: 'var(--radius)',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow)',
                marginBottom: '1rem',
                width: '100%',
                transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
            <span style={{ fontSize: '1.2rem' }}>📱</span> Compartir en WhatsApp
        </button>
    );
}
