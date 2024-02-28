import { create } from "zustand";

// Define interface for expense data
export interface Expense {
  date: Date;
  amount: number;
  category: string;
}

export interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
}

export const useExpenseStore = create<ExpenseStore>()((set) => ({
  expenses: [],
  addExpense: (expense: Expense) => {
    set((state) => ({ expenses: [...state.expenses, expense] }));
  },
}));
