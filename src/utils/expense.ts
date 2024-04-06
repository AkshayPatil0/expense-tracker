import {
  EXPENSE_TYPE,
  Expense,
  ExpenseFilter,
  PendingExpense,
} from "@/store/expenses";
import { sortByDateCompare } from "@/utils/dayjs";
import dayjs from "dayjs";

export const countTotalAmount = (expenses: Array<Expense | PendingExpense>) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

export const filterExpenses = (
  expenses: Array<Expense | PendingExpense>,
  filter: ExpenseFilter
) => {
  return expenses.filter((expense) => {
    const typeMatch = filter.type ? expense.type === filter.type : true;
    const isPending = expense.type === EXPENSE_TYPE.pending;
    const categoryMatch = filter.categories.length
      ? !isPending && filter.categories.includes(expense.categoryId)
      : true;
    const tagsMatch = filter.tags.length
      ? !isPending && filter.tags.some((tag) => expense.tags?.includes(tag))
      : true;

    return typeMatch && categoryMatch && tagsMatch;
  });
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

    if (expense.category.name.match(regex)) return true;

    return false;
  });

export const sortExpenses = (
  expenses: Array<Expense | PendingExpense>,
  by: "date" = "date"
) => {
  switch (by) {
    case "date":
      return expenses.sort(sortByDateCompare);

    default:
      return expenses;
  }
};
