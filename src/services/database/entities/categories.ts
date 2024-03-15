import { EXPENSE_TYPE, Expense, PendingExpense } from "@/store/expenses/types";
import { getDb } from "../connection";
import { Category } from "@/store/category/types";

type CategorySchema = {
  id: number;
  name: string;
  icon: string;
  parentId: number;
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const query = "SELECT * FROM categories";
    // const query = "DROP TABLE categories";
    const db = await getDb();

    const result = await db.getAllAsync<CategorySchema>(query);
    // const result = await db.runAsync(query);

    return result.map<Category>((cat) => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
    }));
  } catch (err) {
    console.error(`[Database Service][getCategories] ${err}`);
    return [];
  }
};

export const insertCategories = async (
  categories: Array<Omit<Category, "id">>
) => {
  try {
    const db = await getDb();
    const query =
      "INSERT INTO categories (name, icon) VALUES " +
      categories.map((expense) => `(?, ?)`).join(", ");

    const result = await db.runAsync(
      query,
      ...categories.map<string[]>((cat) => [cat.name, cat.icon]).flat()
    );

    return result.lastInsertRowId;
  } catch (err) {
    console.error(`[Database Service][insertCategories] ${err}`);
  }
};

export const updateCategory = async (category: Category) => {
  try {
    const db = await getDb();

    const query = "UPDATE categories SET name = ?, icon = ?) WHERE id = ?";

    const result = await db.runAsync(
      query,
      category.name,
      category.icon,
      category.id
    );

    return result;
  } catch (err) {
    console.error(`[Database Service][updateCategory] ${err}`);
  }
};
