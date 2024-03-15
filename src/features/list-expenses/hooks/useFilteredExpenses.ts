import { useExpenseStore } from "@/store/expenses";
import { useMemo } from "react";
import { filterExpenses } from "../utils/expense";

export const useFilteredExpenses = () => {
  const { filter, expenses } = useExpenseStore();

  return useMemo(() => filterExpenses(expenses, filter), [expenses, filter]);
};
