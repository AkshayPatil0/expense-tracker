import { Expense, PendingExpense } from "@/store/expenses";

export const countTotalAmount = (expenses: Array<Expense | PendingExpense>) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};
