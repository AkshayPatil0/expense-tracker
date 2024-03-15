import {
  deleteExpense,
  insertAddedExpenses,
  insertPendingExpenses,
  updateExpense,
} from "@/services/database/entities/expenses";
import { useExpenseStore } from "./store";
import { EXPENSE_TYPE, Expense, ExpenseType, PendingExpense } from "./types";
import { AddExpenseInput } from "@/features/manage-expense/store/add-expense-input";
import { EditExpenseInput } from "@/features/manage-expense/store/edit-expense-input";
import { getCategoryById } from "../category/hooks";

export const addExpense = async (expense: AddExpenseInput) => {
  try {
    const store = useExpenseStore.getState();

    const id = (await insertAddedExpenses([expense]))[0];

    if (!id) throw new Error("Failed to insert !");
    store.addExpense({
      ...expense,
      id,
      category: getCategoryById(expense.categoryId),
      type: EXPENSE_TYPE.added,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addPendingExpense = async (
  expense: Omit<PendingExpense, "id" | "type">
) => {
  const store = useExpenseStore.getState();

  const id = (await insertPendingExpenses([expense]))[0];

  if (!id) throw new Error("Failed to insert !");
  store.addExpense({
    ...expense,
    id,
    type: EXPENSE_TYPE.pending,
  });
};

export const editExpense = async (
  expense: EditExpenseInput & {
    id: string;
    type: keyof Omit<typeof EXPENSE_TYPE, "pending">;
  }
) => {
  try {
    const store = useExpenseStore.getState();
    await updateExpense(expense);
    store.editExpense({
      ...expense,
      category: getCategoryById(expense.categoryId),
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const trackExpense = async (
  expense: EditExpenseInput & {
    id: string;
  }
) => {
  try {
    const store = useExpenseStore.getState();
    const id = (await insertAddedExpenses([expense]))[0];
    await deleteExpense(expense.id, EXPENSE_TYPE.pending);
    store.addExpense({
      ...expense,
      id,
      type: EXPENSE_TYPE.tracked,
      category: getCategoryById(expense.categoryId),
    });
    store.deleteExpense(expense.id);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const removeExpense = async (id: string, type: ExpenseType) => {
  try {
    const store = useExpenseStore.getState();
    await deleteExpense(id, type);
    store.deleteExpense(id);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
