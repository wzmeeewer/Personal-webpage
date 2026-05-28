import { create } from "zustand";

const getIsMobile = () => window.innerWidth < 764;

export const useResponsiveStore = create(() => ({
  isMobile: getIsMobile(),
}));

window.addEventListener("resize", () => {
  useResponsiveStore.setState({ isMobile: getIsMobile() });
});
