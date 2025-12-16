import { useState } from 'react';
import { useAppStore } from './hooks/useAppStore';
import { MemberForm } from './components/MemberForm';
import { MemberCard } from './components/MemberCard';
import { GiftListModal } from './components/GiftListModal';

function App() {
  const { members, addMember, removeMember, addGift, removeGift, toggleGift } = useAppStore();
  const [selectedMemberId, setSelectedMemberId] = useState(null);

  const selectedMember = members.find(m => m.id === selectedMemberId);

  return (
    <div className="container">
      <header>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary)', fontSize: '2.5rem', fontWeight: '800' }}>
          🎁 Lista de Regalos
        </h1>
      </header>

      <main>
        <MemberForm onAdd={addMember} />

        {members.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'var(--white)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            color: 'var(--gray)',
            marginTop: '2rem'
          }}>
            <p style={{ fontSize: '1.1rem' }}>No hay integrantes aún.</p>
            <p>Agrega a alguien para comenzar a organizar los regalos.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {members.map(member => (
              <MemberCard
                key={member.id}
                member={member}
                onRemove={removeMember}
                onClick={() => setSelectedMemberId(member.id)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedMember && (
        <GiftListModal
          member={selectedMember}
          onClose={() => setSelectedMemberId(null)}
          onAddGift={addGift}
          onRemoveGift={removeGift}
          onToggleGift={toggleGift}
        />
      )}
    </div>
  )
}

export default App
