import { EXPENSE_TYPE, Expense, PendingExpense } from "@/store/expenses";
import { View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";
import PendingExpenseListItem from "./PendingExpenseListItem";
import ExpenseListItem from "./ExpenseListItem";

export interface ExpensesListProps {
  expenses: Array<Expense | PendingExpense>;
}

export default function ExpensesList(props: ExpensesListProps) {
  return (
    <View style={style.root}>
      {props.expenses.map((expense, index) =>
        expense.type === EXPENSE_TYPE.pending ? (
          <PendingExpenseListItem expense={expense} key={index} />
        ) : (
          <ExpenseListItem expense={expense} key={index} />
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
