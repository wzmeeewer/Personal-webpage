import { create } from "zustand";

export const useExperienceStore = create((set) => ({
  isExperienceReady: false,
  isInfoPanelOpen: false,
  setIsExperienceReady: (bool) => set({ isExperienceReady: bool }),
  setIsInfoPanelOpen: (bool) => set({ isInfoPanelOpen: bool }),
}));
