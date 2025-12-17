import { useState } from 'react';
import { useAppStore } from './hooks/useAppStore';
import { MemberForm } from './components/MemberForm';
import { MemberCard } from './components/MemberCard';
import { GiftListModal } from './components/GiftListModal';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/AuthContext';
import { Login } from './components/Login';

import { Hero } from './components/Hero';

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
    <div className="app-container">
      <Hero currentUser={currentUser} onLogout={logout} />

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
        <MemberForm onAdd={addMember} />

        <div className="members-grid" style={{ marginTop: '3rem' }}>
          {members.map(member => (
            <MemberCard
              key={member.id}
              member={member}
              onRemove={removeMember}
              onClick={() => setSelectedMemberId(member.id)}
            />
          ))}
        </div>
      </div>

      {
        selectedMember && (
          <GiftListModal
            member={selectedMember}
            onClose={() => setSelectedMemberId(null)}
            onAddGift={addGift}
            onRemoveGift={removeGift}
            onToggleGift={toggleGift}
          />
        )
      }
    </div >
  )
}

export default App
