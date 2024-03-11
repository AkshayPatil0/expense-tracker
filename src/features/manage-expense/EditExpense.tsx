import { StyleSheet, Alert } from "react-native";
import { View } from "@/theme/components/Themed";
import DateInput from "@/features/manage-expense/components/DateInput";
import { AmountInput } from "./components/AmountInput";
import { ActionBar } from "./components/ActionBar";
import NoteInput from "./components/NoteInput";
import CategoryInput from "./components/CategoryInput";
import TagsInput from "./components/TagsInput";
import { InputStoreProvider } from "@/providers/input-store/InputStoreContext";
import {
  useEditExpenseInput,
  useEditExpenseInputStore,
} from "./store/edit-expense-input";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  EXPENSE_TYPE,
  useExpenseById,
  useExpenseStore,
} from "@/store/expenses";

export default function EditExpense(props: AddExpenseProps) {
  const { input, resetInput, isDirty } = useEditExpenseInputStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const selectedExpense = useExpenseById(+id);

  const onDelete = () => {
    if (isDirty) {
      Alert.alert("Are you sure ?", "This will reset all input fields", [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => resetInput(),
          isPreferred: true,
        },
      ]);
    }
  };

  const { editExpense } = useExpenseStore();
  const onAddExpense = () => {
    // Todo - Validate expense
    editExpense({ ...input, id: +id, type: EXPENSE_TYPE.added });
    resetInput();
    router.navigate("/");
  };

  useEffect(() => {
    switch (selectedExpense?.type) {
      case EXPENSE_TYPE.added:
      case EXPENSE_TYPE.tracked:
        resetInput({
          ...selectedExpense,
        });
        break;

      case EXPENSE_TYPE.pending:
        resetInput({
          amount: selectedExpense.amount,
          category: "",
          date: selectedExpense.date,
          note: `Paid to ${selectedExpense.paidTo}`,
          tags: [],
        });

      default:
        break;
    }
  }, [selectedExpense]);
  return (
    <>
      <View style={styles.root}>
        <View style={styles.formContainer}>
          <InputStoreProvider useInput={useEditExpenseInput}>
            <AmountInput />
            <NoteInput />
            <CategoryInput />
            <DateInput />
            <TagsInput />
            <ActionBar action="Edit Expense" onAction={onAddExpense} />
          </InputStoreProvider>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    position: "relative",
  },
  formContainer: {
    paddingVertical: 48,
    flexDirection: "column",
    gap: 24,
    flex: 1,
  },
  actionBarContainer: {},
});

type AddExpenseProps = {
  amount?: number;
  paidTo?: string;
  date?: Date;
};
