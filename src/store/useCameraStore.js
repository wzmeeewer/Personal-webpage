import { create } from "zustand";

export const useCameraStore = create((set) => ({
  zoom: 1,
  activeView: "home",
  setZoom: (zoom) => set({ zoom }),
  setActiveView: (activeView) => set({ activeView }),
}));
