// deleteModalStore.js
import { deleteDoc, doc } from 'firebase/firestore';
import { create } from 'zustand';
import { db } from '../firebase';
interface DeleteModalState {
  isOpen: boolean;
  id: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;
  deleteDiary: (id: string) => Promise<void>;
}

const useDeleteModalStore = create<DeleteModalState>((set) => ({
  isOpen: false,
  id: null, // 추가된 부분
  openModal: (id) => set({ isOpen: true, id }),
  closeModal: () => set({ isOpen: false, id: null }),
  deleteDiary: async (id: string) => {
    try {
      // Firestore에서 해당 문서 삭제
      await deleteDoc(doc(db, 'diary', id));
      console.log(`Diary with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting diary:', error);
    }
  },
}));

export default useDeleteModalStore;
