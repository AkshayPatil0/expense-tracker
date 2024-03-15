import {
  EXPENSE_TYPE,
  Expense,
  ExpenseType,
  PendingExpense,
} from "@/store/expenses/types";
import { getDb } from "../connection";

type ExpenseSchema = {
  id: number;
  amount: number;
  date: string;
  note: string;
  categoryId: number;
};

type JoinedCategorySchema = {
  categoryName: string;
  categoryIcon: string;
};

type PendingExpenseSchema = {
  id: number;
  amount: number;
  date: string;
  paidTo: string;
};

const idToDbId = (id: string): number => +id.split("_")[1];

const ID_SUFFIX_BY_TYPE: Record<ExpenseType, string> = {
  [EXPENSE_TYPE.added]: "a",
  [EXPENSE_TYPE.tracked]: "t",
  [EXPENSE_TYPE.pending]: "p",
} as const;

const dbIdToId = (id: number, type: ExpenseType): string =>
  `${ID_SUFFIX_BY_TYPE[type]}_${id}`;

const getInsertIds = (items: unknown[], lastInsertedId: number) =>
  items.map(() => lastInsertedId--);

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const query = `
    SELECT e.*, c.name as categoryName, c.icon as categoryIcon 
    FROM expenses AS e JOIN categories AS c 
    ON e.categoryId == c.id;
    `;
    const db = await getDb();

    const result = await db.getAllAsync<ExpenseSchema & JoinedCategorySchema>(
      query
    );
    return result.map<Expense>((exp) => ({
      ...exp,
      id: dbIdToId(exp.id, EXPENSE_TYPE.added),
      date: new Date(exp.date),
      type: EXPENSE_TYPE.added,
      tags: [],
      category: {
        id: exp.categoryId,
        name: exp.categoryName,
        icon: exp.categoryIcon,
      },
    }));
  } catch (err) {
    console.error(`[Database Service][getExpenses] ${err}`);
    return [];
  }
};

export const getPendingExpenses = async (): Promise<PendingExpense[]> => {
  try {
    const query = "SELECT id, amount, date, paidTo FROM pendingExpenses";
    const db = await getDb();

    const result = await db.getAllAsync<PendingExpenseSchema>(query);
    return result.map<PendingExpense>((exp) => ({
      ...exp,
      id: dbIdToId(exp.id, EXPENSE_TYPE.pending),
      date: new Date(exp.date),
      type: EXPENSE_TYPE.pending,
    }));
  } catch (err) {
    console.error(`[Database Service][getPendingExpenses] ${err}`);
    return [];
  }
};

export const getAllExpenses = async (): Promise<
  Array<Expense | PendingExpense>
> => {
  try {
    const [expenses, pendingExpenses] = await Promise.all([
      getExpenses(),
      getPendingExpenses(),
    ]);

    return [...expenses, ...pendingExpenses];
  } catch (err) {
    console.error(`[Database Service][getAllExpenses] ${err}`);
    return [];
  }
};

export const insertAddedExpenses = async (
  expenses: Array<Omit<Expense, "id" | "category" | "type">>
): Promise<string[]> => {
  try {
    const db = await getDb();
    const query =
      "INSERT INTO expenses (amount, date, note, categoryId) VALUES " +
      expenses.map((expense) => `(?, ?, ?, ?)`).join(", ");

    const result = await db.runAsync(
      query,
      ...expenses
        .map((expense) => [
          expense.amount.toString(),
          expense.date.toString(),
          expense.note,
          expense.categoryId,
        ])
        .flat()
    );

    return getInsertIds(expenses, result.lastInsertRowId).map((id) =>
      dbIdToId(id, EXPENSE_TYPE.added)
    );
  } catch (err) {
    console.error(`[Database Service][insertAddedExpenses] ${err}`);
    throw err;
  }
};
export const insertPendingExpenses = async (
  expenses: Array<Omit<PendingExpense, "id" | "type">>
) => {
  try {
    const db = await getDb();
    const query =
      "INSERT INTO pendingExpenses (amount, date, paidTo) VALUES " +
      expenses.map((expense) => `(?, ?, ?)`).join(", ");

    const result = await db.runAsync(
      query,
      ...expenses
        .map<string[]>((expense) => [
          expense.amount.toString(),
          expense.date.toString(),
          expense.paidTo,
        ])
        .flat()
    );

    return getInsertIds(expenses, result.lastInsertRowId).map((id) =>
      dbIdToId(id, EXPENSE_TYPE.pending)
    );
  } catch (err) {
    console.error(`[Database Service][insertPendingExpenses] ${err}`);
    throw err;
  }
};

export const updateExpense = async (expense: Expense) => {
  try {
    const db = await getDb();

    const query =
      "UPDATE expenses SET amount = ?, date = ?, note = ?, categoryId = ? WHERE id = ?;";

    const result = await db.runAsync(
      query,
      expense.amount,
      expense.date.toString(),
      expense.note,
      expense.categoryId,
      idToDbId(expense.id)
    );
    console.log(`[Database Service][updateExpense] ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.error(`[Database Service][updateExpense] ${err}`);
    throw err;
  }
};

export const deleteExpense = async (id: string, type: ExpenseType) => {
  switch (type) {
    case EXPENSE_TYPE.added:
    case EXPENSE_TYPE.tracked:
      await deleteAddedExpense(idToDbId(id));
      break;

    case EXPENSE_TYPE.pending:
      await deletePendingExpense(idToDbId(id));
      break;

    default:
      throw new Error("Invalid type");
  }
};

export const deleteAddedExpense = async (id: number) => {
  try {
    const db = await getDb();
    const query = "DELETE FROM expenses WHERE id = ?;";
    const result = await db.runAsync(query, id);
    console.log(
      `[Database Service][deleteAddedExpense] result ${JSON.stringify(result)}`
    );
    return result;
  } catch (err) {
    console.error(`[Database Service][deleteAddedExpense] ${err}`);
    throw err;
  }
};

export const deletePendingExpense = async (id: number) => {
  try {
    const db = await getDb();
    const query = "DELETE FROM pendingExpenses WHERE id = ?;";
    const result = await db.runAsync(query, id);
    console.error(
      `[Database Service][deletePendingExpense] result ${JSON.stringify(
        result
      )}`
    );
    return result;
  } catch (err) {
    console.error(`[Database Service][deletePendingExpense] ${err}`);
    throw err;
  }
};
