import { create } from "zustand";

export const useExperienceStore = create((set) => ({
  isExperienceReady: false,
  isSceneReady: false,
  setIsExperienceReady: (bool) => set({ isExperienceReady: bool }),
  setIsSceneReady: (bool) => set({ isSceneReady: bool }),
}));
