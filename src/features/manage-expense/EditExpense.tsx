import { StyleSheet } from "react-native";
import { View } from "@/theme/components/Themed";
import DateInput from "@/features/manage-expense/components/DateInput";
import { AmountInput } from "./components/AmountInput";
import { ActionBar } from "./components/ActionBar";
import NoteInput from "./components/NoteInput";
import CategoryInput from "./components/CategoryInput";
import TagsInput from "./components/TagsInput";
import { InputStoreProvider } from "@/providers/input-store/InputStoreContext";
import {
  EditExpenseInput,
  useEditExpenseInput,
  useEditExpenseInputStore,
} from "./store/edit-expense-input";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { EXPENSE_TYPE, useExpenseById } from "@/store/expenses";
import { DismissKeyboardView } from "@/components/DismissKeyboard";
import { editExpense, trackExpense } from "@/store/expenses/actions";

export default function EditExpense(props: AddExpenseProps) {
  // const { input, resetInput } = useEditExpenseInputStore();
  const { id } = useLocalSearchParams<{ id: string }>();
  const selectedExpense = useExpenseById(id);
  const isPending = selectedExpense?.type === EXPENSE_TYPE.pending;

  const onEditExpense = async () => {
    const { input, resetInput } = useEditExpenseInputStore.getState();
    if (!id || !selectedExpense) return;
    // Todo - Validate expense

    isPending
      ? await trackExpense({ ...input, id })
      : await editExpense({ ...input, id, type: selectedExpense.type });

    resetInput();
    router.navigate("/");
  };

  useEffect(() => {
    const { resetInput } = useEditExpenseInputStore.getState();
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
          date: selectedExpense.date,
          note: `Paid to ${selectedExpense.paidTo}`,
        });

      default:
        break;
    }
  }, [selectedExpense]);

  return (
    <>
      <View style={styles.root}>
        <DismissKeyboardView style={styles.formContainer}>
          <InputStoreProvider<EditExpenseInput> useInput={useEditExpenseInput}>
            <AmountInput />
            <NoteInput />
            <CategoryInput />
            <DateInput />
            <TagsInput />
            <ActionBar
              action={isPending ? "Track Expense" : "Edit Expense"}
              onAction={onEditExpense}
            />
          </InputStoreProvider>
        </DismissKeyboardView>
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
