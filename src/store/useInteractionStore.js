import { create } from "zustand";

export const useInteractionStore = create((set) => ({
  activeArea: null,
  setActiveArea: (area) => set({ activeArea: area }),
  toggleArea: (area) =>
    set((state) => ({
      activeArea: state.activeArea === area ? null : area,
    })),
}));
