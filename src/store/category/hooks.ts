import { useMemo } from "react";
import { useCategoryStore } from "./store";

export const useCategoryById = (id: number) => {
  const { categories } = useCategoryStore();

  return useMemo(
    () => categories.find((cat) => cat.id === id),
    [categories, id]
  );
};
