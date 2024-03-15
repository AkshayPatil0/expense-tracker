import { useExpenseStore } from "@/store/expenses";
import { useMemo } from "react";
import { searchExpenses, sortExpenses } from "../utils/expense";

export const useSearchedExpenses = (search: string) => {
  const { expenses } = useExpenseStore();

  return useMemo(
    () => sortExpenses(searchExpenses(expenses, search)),
    [expenses, search]
  );
};
