import { useState } from 'react';
import { useAppStore } from './hooks/useAppStore';
import { MemberForm } from './components/MemberForm';
import { MemberCard } from './components/MemberCard';
import { GiftListModal } from './components/GiftListModal';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/AuthContext';
import { Login } from './components/Login';

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const { currentUser, logout } = useAuth();
  const { members, addMember, removeMember, addGift, removeGift, toggleGift } = useAppStore();

  const [selectedMemberId, setSelectedMemberId] = useState(null);

  if (!currentUser) {
    return <Login />;
  }

  const selectedMember = members.find(m => m.id === selectedMemberId);

  return (
    <div className="container">
      <header style={{
        textAlign: 'center',
        marginBottom: '3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>
            🎄 Regalos de Navidad
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
            Hola, {currentUser.displayName?.split(' ')[0]}
          </span>
          <button
            onClick={logout}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.8rem',
              background: 'transparent',
              border: '1px solid var(--primary)',
              color: 'var(--primary)'
            }}
          >
            Salir
          </button>
        </div>
      </header>

      <MemberForm onAdd={addMember} />

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
