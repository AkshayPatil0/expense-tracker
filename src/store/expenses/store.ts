import { create } from "zustand";
import { Expense, ExpenseFilter, ExpenseStore, PendingExpense } from "./types";
import { getAllExpenses } from "@/services/database/entities/expenses";

export const useExpenseStore = create<ExpenseStore>()((set, get) => ({
  // expenses: [...expenses, ...pendingExpenses],
  expenses: [],
  filter: { categories: [], tags: [], type: null },
  setFilter: <K extends keyof ExpenseFilter>(
    key: K,
    value: ExpenseFilter[K]
  ) => {
    set((state) => ({
      filter: {
        ...state.filter,
        [key]: value,
      },
    }));
  },
  addExpense: (expense: Expense | PendingExpense) => {
    set((state) => ({
      expenses: [...state.expenses, expense],
    }));
  },
  editExpense: (expense: Expense | PendingExpense) => {
    set((state) => ({
      expenses: state.expenses.map((exp) =>
        exp.id === expense.id ? expense : exp
      ),
    }));
  },
  deleteExpense: (id: string) => {
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    }));
  },
}));

getAllExpenses().then((expenses) => {
  useExpenseStore.setState({ expenses });
});
