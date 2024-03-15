import { useMemo } from "react";
import { useExpenseStore } from "./store";
import { ExpenseFilter } from "./types";

export const useExpenseFilters = <K extends keyof ExpenseFilter>(key: K) => {
  const { filter, setFilter } = useExpenseStore();

  const setter = (value: ExpenseFilter[K]) => {
    setFilter(key, value);
  };

  return [filter[key], setter] as const;
};

export const useExpenseById = (id: string) => {
  const { expenses } = useExpenseStore();

  return useMemo(
    () => expenses.find((expense) => expense.id === id),
    [expenses, id]
  );
};
