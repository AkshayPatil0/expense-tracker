import { SQLiteDatabase } from "expo-sqlite/next";

const colors = {
  Teal: "#00B2AD",
  Orange: "#FBA94C",
  Lavender: "#D3CCE6",
  Lime_Green: "#C0D948",
  Royal_Blue: "#4363D8",
  Magenta: "#F032E6",
  Emerald_Green: "#538035",
  Mustard_Yellow: "#D98720",
  Sky_Blue: "#8BC3EB",
  Plum: "#8E44AD",
  Dark_Cherry: "#800000",
  Golden_Yellow: "#FFD700",
  Cerulean_Blue: "#29ABCA",
  Fuchsia: "#FF00FF",
  Forest_Green: "#29ABCA",
  Deep_Orange: "#F75A38",
};

const categories = [
  {
    id: 1,
    name: "Food",
    icon: "🍔",
    color: colors.Dark_Cherry,
  },
  {
    id: 2,
    name: "Rent",
    icon: "🏠",
    color: colors.Emerald_Green,
  },
  {
    id: 3,
    name: "Transportation",
    icon: "🚗",
    color: colors.Emerald_Green,
  },
  {
    id: 4,
    name: "Utilities",
    icon: "💡",
    color: colors.Teal,
  },
  {
    id: 5,
    name: "Entertainment",
    icon: "🎮",
    color: colors.Orange,
  },
  {
    id: 6,
    name: "Shopping",
    icon: "🛍️",
    color: colors.Lavender,
  },
  {
    id: 7,
    name: "Health",
    icon: "🏥",
    color: colors.Lime_Green,
  },
  {
    id: 8,
    name: "Personal Care",
    icon: "🛁",
    color: colors.Royal_Blue,
  },
  {
    id: 9,
    name: "Gifts",
    icon: "🎁",
    color: colors.Magenta,
  },
  {
    id: 10,
    name: "Savings",
    icon: "💰",
    color: colors.Mustard_Yellow,
  },
  {
    id: 11,
    name: "Miscellaneous",
    icon: "❓",
    color: colors.Sky_Blue,
  },
];

const loadCategoriesQuery =
  "INSERT INTO categories (id, name, icon) VALUES" +
  categories
    .map((cat) => `(${cat.id}, '${cat.name}', '${cat.icon}')`)
    .join(",\n") +
  ";\n\n";

const expenses = [
  {
    id: 1,
    note: "Groceries",
    date: new Date(2024, 2, 1, 19, 30), // February 27 2024, 7:30 PM
    amount: 50.0,
    category: 1,
  },
  {
    id: 2,
    note: "Groceries",
    date: new Date(2024, 1, 27, 19, 30), // February 27 2024, 7:30 PM
    amount: 50.0,
    category: 1,
  },
  {
    id: 3,
    note: "Bus ticket",
    date: new Date(2024, 1, 27, 8, 15), // February 28 2024, 8:15 AM
    amount: 12.0,
    category: 3,
  },
  {
    id: 4,
    note: "Electricity bill",
    date: new Date(2024, 1, 27, 10, 0), // February 15 2024, 10:00 AM
    amount: 85.75,
    category: 4,
  },
  {
    id: 5,
    note: "Movie ticket",
    date: new Date(2024, 1, 24, 15, 0), // February 24 2024, 3:00 PM
    amount: 15.5,
    category: 5,
  },
  {
    id: 6,
    note: "Clothes",
    date: new Date(2024, 1, 24, 12, 30), // February 20 2024, 12:30 PM
    amount: 78.99,
    category: 6,
  },
  {
    id: 7,
    note: "Doctor visit copay",
    date: new Date(2024, 1, 22, 10, 15), // February 22 2024, 10:15 AM
    amount: 25.0,
    category: 7,
  },
  {
    id: 8,
    note: "Haircut",
    date: new Date(2024, 1, 18, 14, 0), // February 18 2024, 2:00 PM
    amount: 30.0,
    category: 8,
  },
  {
    id: 9,
    note: "Birthday gift for friend",
    date: new Date(2024, 1, 10, 11, 0), // February 10 2024, 11:00 AM
    amount: 42.5,
    category: 9,
  },
  {
    id: 10,
    note: "Transferred to savings account",
    date: new Date(2024, 1, 5, 13, 0), // February 5 2024, 1:00 PM
    amount: 100.0,
    category: 10,
  },
];

const loadExpensesQuery =
  "INSERT INTO expenses (id, amount, date, note, categoryId) VALUES " +
  expenses
    .map(
      (exp) =>
        `(${exp.id}, ${exp.amount}, '${exp.date.toString()}', '${exp.note}', ${
          exp.category
        })`
    )
    .join(",\n") +
  ";\n\n";

const pendingExpenses = [
  {
    id: 1,
    paidTo: "Akshay Patil [7798197575@okicici]",
    date: new Date(2024, 2, 1, 19, 30), // February 27 2024, 7:30 PM
    amount: 500.0,
  },
  {
    id: 2,
    paidTo: "Akshay Patil [7798197575@okicici]",
    date: new Date(2024, 1, 27, 19, 30), // February 27 2024, 7:30 PM
    amount: 587.0,
  },
  {
    id: 3,
    paidTo: "Akshay Patil [7798197575@okicici]",
    date: new Date(2024, 1, 27, 8, 15), // February 28 2024, 8:15 AM
    amount: 654.0,
  },
];

const loadPendingExpensesQuery =
  "INSERT INTO pendingExpenses (id, amount, date, paidTo) VALUES " +
  pendingExpenses
    .map(
      (exp) =>
        `(${exp.id}, ${exp.amount}, '${exp.date.toString()}', '${exp.paidTo}')`
    )
    .join(",\n") +
  ";\n\n";

export const loadInitialData = async (db: SQLiteDatabase) => {
  console.log(
    loadCategoriesQuery + loadExpensesQuery + loadPendingExpensesQuery
  );
  await db.execAsync(
    loadCategoriesQuery + loadExpensesQuery + loadPendingExpensesQuery
  );
};
