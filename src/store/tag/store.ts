import { getCategories } from "@/services/database/entities/categories";
import { create } from "zustand";
import { TagStore } from "./types";

export const useTagStore = create<TagStore>()((set) => ({
  tags: [],
  addTag: (tag: string) => {
    set((state) => ({
      tags: [...state.tags, tag],
    }));
  },
  deleteTag: (tag: string) => {
    set((state) => ({
      tags: state.tags.filter((t) => t !== tag),
    }));
  },
}));
export const tags = [
  "Wedding",
  "Birthday",
  "Vacation",
  "Home Improvement",
  "Car Repair",
  "Medical Procedure",
  "Concert",
  "Conference",
  "Pet Expense",
  "Gift Giving",
];

getCategories().then((categories) => useTagStore.setState({ tags }));
