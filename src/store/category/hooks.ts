import { useMemo } from "react";
import { useCategoryStore } from "./store";

export const useCategoryById = (id: number) => {
  const { categories } = useCategoryStore();

  return useMemo(
    () => categories.find((cat) => cat.id === id),
    [categories, id]
  );
};

export const getCategoryById = (id: number) => {
  const categoryStore = useCategoryStore.getState();

  const category = categoryStore.categories.find((cat) => cat.id === id);

  if (!category) throw new Error(`Category not found for id ${id}`);

  return category;
};
