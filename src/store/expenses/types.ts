import { Category } from "../category/types";

export const EXPENSE_TYPE = {
  pending: "pending",
  tracked: "tracked",
  added: "added",
} as const;

export type ExpenseType = keyof typeof EXPENSE_TYPE;

export interface Expense {
  id: string;
  note: string;
  date: Date;
  amount: number;
  categoryId: number;
  category: Category;
  tags: string[];
  type: (typeof EXPENSE_TYPE)["tracked" | "added"];
}
export interface PendingExpense {
  id: string;
  amount: number;
  date: Date;
  paidTo: string;
  type: (typeof EXPENSE_TYPE)["pending"];
}

export interface ExpenseFilter {
  categories: number[];
  tags: string[];
  type: keyof typeof EXPENSE_TYPE | null;
}

export interface ExpenseStore {
  expenses: Array<Expense | PendingExpense>;
  filter: ExpenseFilter;
  setFilter: (
    key: keyof ExpenseFilter,
    value: ExpenseFilter[keyof ExpenseFilter]
  ) => void;
  addExpense: (expense: Expense | PendingExpense) => void;
  editExpense: (expense: Expense | PendingExpense) => void;
  deleteExpense: (id: string) => void;
}
