import { EXPENSE_TYPE, Expense, PendingExpense } from "@/store/expenses";
import dayjs from "dayjs";

export const countTotalAmount = (expenses: Array<Expense | PendingExpense>) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const searchExpenses = (
  expenses: Array<Expense | PendingExpense>,
  search: string
) =>
  expenses.filter((expense) => {
    const regex = new RegExp(search, "i");
    if (expense.amount.toString().match(regex)) return true;

    if (expense.type === EXPENSE_TYPE.pending) {
      return !!expense.paidTo.match(regex);
    }

    if (expense.note.match(regex)) return true;

    if (expense.category.match(regex)) return true;

    return false;
  });

export const sortExpenses = (
  expenses: Array<Expense | PendingExpense>,
  by: "date" = "date"
) => {
  switch (by) {
    case "date":
      return expenses.sort((e1, e2) =>
        dayjs(e1.date).isAfter(dayjs(e2.date)) ? -1 : 1
      );

    default:
      return expenses;
  }
};
