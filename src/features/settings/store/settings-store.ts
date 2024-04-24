import { create } from "zustand";
// Define interface for expense data

export interface InsightsStore {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

export const useSettingsStore = create<InsightsStore>()((set, get) => ({
  selectedMenu: "",
  setSelectedMenu(selectedMenu) {
    set({ selectedMenu });
  },
}));
