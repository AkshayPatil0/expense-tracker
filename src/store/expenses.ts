import { useMemo } from "react";
import { create } from "zustand";

// Define interface for expense data

export const EXPENSE_TYPE = {
  pending: "pending",
  tracked: "tracked",
  added: "added",
} as const;

export interface Expense {
  id: number;
  note: string;
  date: Date;
  amount: number;
  category: string;
  tags: string[];
  type: (typeof EXPENSE_TYPE)["tracked" | "added"];
}
export interface PendingExpense {
  id: number;
  amount: number;
  paidTo: string;
  date: Date;
  type: (typeof EXPENSE_TYPE)["pending"];
}

interface ExpenseFilter {
  categories: string[];
  tags: string[];
  type: keyof typeof EXPENSE_TYPE | null;
}

export interface ExpenseStore {
  expenses: Array<Expense | PendingExpense>;
  filter: ExpenseFilter;
  getExpenses: () => Array<Expense | PendingExpense>;
  setFilter: (
    key: keyof ExpenseFilter,
    value: ExpenseFilter[keyof ExpenseFilter]
  ) => void;
  addExpense: (
    expense: Omit<Expense, "id"> | Omit<PendingExpense, "id">
  ) => void;
  editExpense: (expense: Expense | PendingExpense) => void;
  deleteExpense: (id: number) => void;
}

let idCount = 1;

const expenses = [
  {
    note: "Groceries",
    date: new Date(2024, 2, 1, 19, 30), // February 27 2024, 7:30 PM
    amount: 50.0,
    category: "food",
  },
  {
    note: "Groceries",
    date: new Date(2024, 1, 27, 19, 30), // February 27 2024, 7:30 PM
    amount: 50.0,
    category: "food",
  },
  {
    note: "Bus ticket",
    date: new Date(2024, 1, 27, 8, 15), // February 28 2024, 8:15 AM
    amount: 12.0,
    category: "transportation",
  },
  {
    note: "Electricity bill",
    date: new Date(2024, 1, 27, 10, 0), // February 15 2024, 10:00 AM
    amount: 85.75,
    category: "utilities",
  },
  {
    note: "Movie ticket",
    date: new Date(2024, 1, 24, 15, 0), // February 24 2024, 3:00 PM
    amount: 15.5,
    category: "entertainment",
  },
  {
    note: "Clothes",
    date: new Date(2024, 1, 24, 12, 30), // February 20 2024, 12:30 PM
    amount: 78.99,
    category: "shopping",
  },
  {
    note: "Doctor visit copay",
    date: new Date(2024, 1, 22, 10, 15), // February 22 2024, 10:15 AM
    amount: 25.0,
    category: "health",
  },
  {
    note: "Haircut",
    date: new Date(2024, 1, 18, 14, 0), // February 18 2024, 2:00 PM
    amount: 30.0,
    category: "personalCare",
  },
  {
    note: "Birthday gift for friend",
    date: new Date(2024, 1, 10, 11, 0), // February 10 2024, 11:00 AM
    amount: 42.5,
    category: "gifts",
  },
  {
    note: "Transferred to savings account",
    date: new Date(2024, 1, 5, 13, 0), // February 5 2024, 1:00 PM
    amount: 100.0,
    category: "savings",
  },
  {
    note: "Lunch with co-workers",
    date: new Date(2024, 1, 23, 12, 15), // February 23 2024, 12:15 PM
    amount: 18.75,
    category: "food",
  },
  {
    note: "Car repair",
    date: new Date(2024, 1, 13, 16, 0), // February 13 2024, 4:00 PM
    amount: 152.3,
    category: "transportation",
  },
  {
    note: "Internet bill",
    date: new Date(2024, 1, 3, 9, 30), // February 3 2024, 9:30 AM
    amount: 67.5,
    category: "utilities",
  },
  {
    note: "Streaming service subscription",
    date: new Date(2024, 1, 2, 11, 45), // February 2 2024, 11:45 AM
    amount: 12.99,
    category: "entertainment",
  },
].map((e) => ({
  ...e,
  id: idCount++,
  type: EXPENSE_TYPE.added,
  tags: [],
}));

const pendingExpenses = [
  {
    paidTo: "Akshay Patil [7798197575@okicici]",
    date: new Date(2024, 2, 1, 19, 30), // February 27 2024, 7:30 PM
    amount: 5000.0,
  },
  {
    paidTo: "Akshay Patil [7798197575@okicici]",
    date: new Date(2024, 1, 27, 19, 30), // February 27 2024, 7:30 PM
    amount: 5087.0,
  },
  {
    paidTo: "Akshay Patil [7798197575@okicici]",
    date: new Date(2024, 1, 27, 8, 15), // February 28 2024, 8:15 AM
    amount: 12654.0,
  },
].map((e) => ({
  ...e,
  id: idCount++,
  type: EXPENSE_TYPE.pending,
}));

export const useExpenseStore = create<ExpenseStore>()((set, get) => ({
  expenses: [...expenses, ...pendingExpenses],
  filter: { categories: [], tags: [], type: null },

  getExpenses: () => {
    const state = get();
    return state.expenses.filter((expense) => {
      const typeMatch = state.filter.type
        ? expense.type === state.filter.type
        : true;
      const isPending = expense.type === EXPENSE_TYPE.pending;
      const categoryMatch = state.filter.categories.length
        ? !isPending && state.filter.categories.includes(expense.category)
        : true;
      const tagsMatch = state.filter.tags.length
        ? !isPending &&
          state.filter.tags.some((tag) => expense.tags?.includes(tag))
        : true;

      return typeMatch && categoryMatch && tagsMatch;
    });
  },
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
  addExpense: (expense: Omit<Expense, "id"> | Omit<PendingExpense, "id">) => {
    set((state) => ({
      expenses: [...state.expenses, { ...expense, id: idCount++ }],
    }));
  },
  editExpense: (expense: Expense | PendingExpense) => {
    set((state) => ({
      expenses: state.expenses.map((exp) =>
        exp.id === expense.id ? expense : exp
      ),
    }));
  },
  deleteExpense: (id: number) => {
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    }));
  },
}));

export const useFilteredExpenses = () => {
  const { getExpenses, filter, expenses: allExpenses } = useExpenseStore();

  return useMemo(getExpenses, [filter, allExpenses]);
};

export const useExpenseFilters = <K extends keyof ExpenseFilter>(key: K) => {
  const { filter, setFilter } = useExpenseStore();

  const setter = (value: ExpenseFilter[K]) => {
    setFilter(key, value);
  };

  return [filter[key], setter] as const;
};

export const useExpenseById = (id: number) => {
  const { expenses } = useExpenseStore();

  return useMemo(
    () => expenses.find((expense) => expense.id === id),
    [expenses, id]
  );
};
