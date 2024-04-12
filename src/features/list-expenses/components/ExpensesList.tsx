import {
  EXPENSE_TYPE,
  Expense,
  ExpenseType,
  PendingExpense,
  useExpenseStore,
} from "@/store/expenses";
import { View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";
import PendingExpenseListItem from "./PendingExpenseListItem";
import ExpenseListItem from "./ExpenseListItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { removeExpense } from "@/store/expenses/actions";

export interface ExpensesListProps {
  expenses: Array<Expense | PendingExpense>;
  disableGestures?: boolean;
}

export default function ExpensesList(props: ExpensesListProps) {
  const deleteExpense = (type: ExpenseType) => (id: string) => {
    removeExpense(id, type);
  };

  return (
    <View style={style.root}>
      {props.expenses.map((expense, index) =>
        expense.type === EXPENSE_TYPE.pending ? (
          <PendingExpenseListItem
            expense={expense}
            key={expense.id}
            onDelete={deleteExpense(EXPENSE_TYPE.pending)}
            disableGestures={props.disableGestures}
          />
        ) : (
          <ExpenseListItem
            expense={expense}
            key={expense.id}
            onDelete={deleteExpense(expense.type)}
            disableGestures={props.disableGestures}
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
