import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'gift-list-data';

export const useAppStore = () => {
    const [members, setMembers] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    }, [members]);

    const addMember = (name) => {
        if (!name.trim()) return;
        const newMember = {
            id: uuidv4(),
            name: name.trim(),
            gifts: []
        };
        setMembers([...members, newMember]);
    };

    const removeMember = (id) => {
        setMembers(members.filter(m => m.id !== id));
    };

    const addGift = (memberId, text) => {
        if (!text.trim()) return;
        setMembers(members.map(m => {
            if (m.id === memberId) {
                return {
                    ...m,
                    gifts: [...m.gifts, { id: uuidv4(), text: text.trim(), completed: false }]
                };
            }
            return m;
        }));
    };

    const removeGift = (memberId, giftId) => {
        setMembers(members.map(m => {
            if (m.id === memberId) {
                return {
                    ...m,
                    gifts: m.gifts.filter(g => g.id !== giftId)
                };
            }
            return m;
        }));
    };

    const toggleGift = (memberId, giftId) => {
        setMembers(members.map(m => {
            if (m.id === memberId) {
                return {
                    ...m,
                    gifts: m.gifts.map(g => {
                        if (g.id === giftId) return { ...g, completed: !g.completed }
                        return g;
                    })
                };
            }
            return m;
        }));
    }

    return {
        members,
        addMember,
        removeMember,
        addGift,
        removeGift,
        toggleGift
    };
};
