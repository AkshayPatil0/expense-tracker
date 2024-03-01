import { Expense } from "@/store/expenses";

export const countTotalAmount = (expenses: Expense[]) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};
