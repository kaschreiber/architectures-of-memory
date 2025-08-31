// store/useTabs.js
import { create } from "zustand";

export const useTabs = create((set) => ({
  activeTab: "protagonist",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
