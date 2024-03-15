import { getCategories } from "@/services/database/entities/categories";
import { create } from "zustand";
import { Category, CategoryStore } from "./types";

export const useCategoryStore = create<CategoryStore>()((set) => ({
  categories: [],
  addCategory: (category: Category) => {
    set((state) => ({
      categories: [...state.categories, category],
    }));
  },
  editCategory: (category: Category) => {
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === category.id ? category : cat
      ),
    }));
  },
  deleteCategory: (id: number) => {
    set((state) => ({
      categories: state.categories.filter((cat) => cat.id !== id),
    }));
  },
}));

getCategories().then((categories) => useCategoryStore.setState({ categories }));
