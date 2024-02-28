import { StyleSheet } from "react-native";
import { View } from "@/theme/components/Themed";
import { SubmitButton } from "@/components/form/SubmitButton";
import { useAddExpenseInputStore } from "../store/add-expense-input";
import { useExpenseStore } from "@/store/expenses";

export interface ActionBarProps {
  testID?: string;
}

export function ActionBar(props: ActionBarProps) {
  const { input } = useAddExpenseInputStore();
  const { addExpense } = useExpenseStore();
  const onAddExpense = () => {
    // Todo - Validate expense
    addExpense(input);
  };
  return (
    <View style={styles.root}>
      <SubmitButton title="Add Expense" onSubmit={onAddExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
    // justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
