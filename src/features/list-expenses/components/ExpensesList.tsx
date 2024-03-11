import {
  EXPENSE_TYPE,
  Expense,
  PendingExpense,
  useExpenseStore,
} from "@/store/expenses";
import { View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";
import PendingExpenseListItem from "./PendingExpenseListItem";
import ExpenseListItem from "./ExpenseListItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export interface ExpensesListProps {
  expenses: Array<Expense | PendingExpense>;
}

export default function ExpensesList(props: ExpensesListProps) {
  const { deleteExpense } = useExpenseStore();
  return (
    <View style={style.root}>
      {props.expenses.map((expense, index) =>
        expense.type === EXPENSE_TYPE.pending ? (
          <PendingExpenseListItem
            expense={expense}
            key={expense.id}
            onDelete={deleteExpense}
          />
        ) : (
          <ExpenseListItem
            expense={expense}
            key={expense.id}
            onDelete={deleteExpense}
          />
        )
      )}
    </View>
  );
}

export const style = StyleSheet.create({
  root: {
    gap: 12,
  },
});
