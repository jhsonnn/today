import { create } from 'zustand';
interface DiaryState {
  title: string;
  content: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
}

const useDiaryStore = create<DiaryState>((set) => ({
  title: '',
  content: '',
  setTitle: (title: string) => set({ title }),
  setContent: (content: string) => set({ content }),
}));

export default useDiaryStore;