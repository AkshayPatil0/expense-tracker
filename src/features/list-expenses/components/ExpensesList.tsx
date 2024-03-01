import { Expense } from "@/store/expenses";
import { View } from "@/theme/components/Themed";
import ExpenseListItem from "./ExpenseListItem";
import { StyleSheet } from "react-native";

export interface ExpensesListProps {
  expenses: Expense[];
}

export default function ExpensesList(props: ExpensesListProps) {
  return (
    <View style={style.root}>
      {props.expenses.map((expense, index) => (
        <ExpenseListItem expense={expense} key={index} />
      ))}
    </View>
  );
}

export const style = StyleSheet.create({
  root: {
    gap: 12,
  },
});
