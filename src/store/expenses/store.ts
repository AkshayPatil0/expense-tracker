import { create } from "zustand";
import {
  EXPENSE_TYPE,
  Expense,
  ExpenseFilter,
  ExpenseStore,
  PendingExpense,
} from "./types";
import { getAllExpenses } from "@/services/database/entities/expenses";
import { getCategoryById } from "../category/hooks";

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

Promise.resolve().then(() => {
  const expenses = [];
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomDate() {
    // Randomize month (0-11 for January-December)
    const month = getRandomInt(0, 11);
    // Randomize day within month (1-31)
    const day = getRandomInt(1, 28); // Adjust max day based on month
    // Consider adding a range for year if needed
    const year = 2024;
    // Randomize time
    const hour = getRandomInt(0, 23);
    const minute = getRandomInt(0, 59);

    return new Date(year, month, day, hour, minute);
  }

  for (let i = 0; i < 100; i++) {
    const categoryId = getRandomInt(1, 10);
    const newExpense: Expense = {
      id: "a" + expenses.length + i + 1,
      note: `Random Expense ${i + 1}`,
      date: getRandomDate(),
      // Randomize amount within a reasonable range
      amount: getRandomInt(0, 2000),
      // Randomize category (consider extending the logic for more categories)
      categoryId,
      category: getCategoryById(categoryId),
      tags: [],
      type: EXPENSE_TYPE.added,
    };
    expenses.push(newExpense);
  }
  useExpenseStore.setState({ expenses });
});
// getAllExpenses().then((expenses) => {
// const expenses = [];
// function getRandomInt(min: number, max: number) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function getRandomDate() {
//   // Randomize month (0-11 for January-December)
//   const month = getRandomInt(0, 11);
//   // Randomize day within month (1-31)
//   const day = getRandomInt(1, 28); // Adjust max day based on month
//   // Consider adding a range for year if needed
//   const year = 2024;
//   // Randomize time
//   const hour = getRandomInt(0, 23);
//   const minute = getRandomInt(0, 59);

//   return new Date(year, month, day, hour, minute);
// }

// for (let i = 0; i < 100; i++) {
//   const categoryId = getRandomInt(1, 10);
//   const newExpense: Expense = {
//     id: "a" + expenses.length + i + 1,
//     note: `Random Expense ${i + 1}`,
//     date: getRandomDate(),
//     // Randomize amount within a reasonable range
//     amount: getRandomInt(0, 2000),
//     // Randomize category (consider extending the logic for more categories)
//     categoryId,
//     category: getCategoryById(categoryId),
//     tags: [],
//     type: EXPENSE_TYPE.added,
//   };
//   expenses.push(newExpense);
// }
// useExpenseStore.setState({ expenses });
// // });
