import { create } from "zustand";

// Define interface for expense data
export interface Expense {
  note: string;
  date: Date;
  amount: number;
  category: string;
}

export interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
}

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
];

export const useExpenseStore = create<ExpenseStore>()((set) => ({
  expenses: expenses,
  addExpense: (expense: Expense) => {
    set((state) => ({ expenses: [...state.expenses, expense] }));
  },
}));
