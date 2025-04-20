import { create } from 'zustand';

export const useSidebarState = create((set) => ({
  isOpen: false,
  setIsOpen: (val) => set({ isOpen: val }),
}));
