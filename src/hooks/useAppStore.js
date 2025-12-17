import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    query
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

export const useAppStore = () => {
    const { currentUser } = useAuth();
    const [members, setMembers] = useState([]);
    const [loadingData, setLoadingData] = useState(false);

    // 1. Sync data from Firestore
    useEffect(() => {
        if (!currentUser) return;

        setLoadingData(true);
        const membersRef = collection(db, 'users', currentUser.uid, 'members');
        // Ordenamos por fecha de creación si tuviéramos field, o por nombre. 
        // Por ahora sin orden específico o por defecto.
        const q = query(membersRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const membersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Opcional: ordenar en cliente si se necesita
            setMembers(membersData);
            setLoadingData(false);
        }, (error) => {
            console.error("Error leyendo members:", error);
            setLoadingData(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    // 2. Add Member
    const addMember = async (name) => {
        if (!name.trim() || !currentUser) return;

        try {
            await addDoc(collection(db, 'users', currentUser.uid, 'members'), {
                name: name.trim(),
                gifts: [],
                createdAt: new Date()
            });
        } catch (e) {
            console.error("Error adding member:", e);
        }
    };

    // 3. Remove Member
    const removeMember = async (id) => {
        if (!currentUser) return;
        try {
            await deleteDoc(doc(db, 'users', currentUser.uid, 'members', id));
        } catch (e) {
            console.error("Error removing member:", e);
        }
    };

    // 4. Add Gift (Update array in doc)
    const addGift = async (memberId, text) => {
        if (!text.trim() || !currentUser) return;

        const member = members.find(m => m.id === memberId);
        if (!member) return;

        const newGift = {
            id: uuidv4(),
            text: text.trim(),
            completed: false
        };

        const updatedGifts = [...(member.gifts || []), newGift];

        try {
            const memberRef = doc(db, 'users', currentUser.uid, 'members', memberId);
            await updateDoc(memberRef, { gifts: updatedGifts });
        } catch (e) {
            console.error("Error adding gift:", e);
        }
    };

    // 5. Remove Gift
    const removeGift = async (memberId, giftId) => {
        if (!currentUser) return;

        const member = members.find(m => m.id === memberId);
        if (!member) return;

        const updatedGifts = member.gifts.filter(g => g.id !== giftId);

        try {
            const memberRef = doc(db, 'users', currentUser.uid, 'members', memberId);
            await updateDoc(memberRef, { gifts: updatedGifts });
        } catch (e) {
            console.error("Error removing gift:", e);
        }
    };

    // 6. Toggle Gift
    const toggleGift = async (memberId, giftId) => {
        if (!currentUser) return;

        const member = members.find(m => m.id === memberId);
        if (!member) return;

        const updatedGifts = member.gifts.map(g => {
            if (g.id === giftId) return { ...g, completed: !g.completed };
            return g;
        });

        try {
            const memberRef = doc(db, 'users', currentUser.uid, 'members', memberId);
            await updateDoc(memberRef, { gifts: updatedGifts });
        } catch (e) {
            console.error("Error toggling gift:", e);
        }
    };

    return {
        members,
        loadingData,
        addMember,
        removeMember,
        addGift,
        removeGift,
        toggleGift
    };
};
