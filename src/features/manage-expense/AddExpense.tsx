import { StyleSheet, Alert } from "react-native";
import { View } from "@/theme/components/Themed";
import DateInput from "@/features/manage-expense/components/DateInput";
import { AmountInput } from "./components/AmountInput";
import { ActionBar } from "./components/ActionBar";
import NoteInput from "./components/NoteInput";
import CategoryInput from "./components/CategoryInput";
import TagsInput from "./components/TagsInput";
import SafeView from "@/components/SafeView";
import {
  AddExpenseInput,
  useAddExpenseInput,
  useAddExpenseInputStore,
} from "./store/add-expense-input";
import { TopBarClose } from "@/components/TopBarClose";
import { InputStoreProvider } from "@/providers/input-store/InputStoreContext";
import { EXPENSE_TYPE } from "@/store/expenses";
import { router } from "expo-router";
import { DismissKeyboardView } from "@/components/DismissKeyboard";
import { addExpense } from "@/store/expenses/actions";

export default function AddExpense(props: AddExpenseProps) {
  const { input, resetInput, isDirty } = useAddExpenseInputStore();
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

  const onAddExpense = async () => {
    // Todo - Validate expense
    await addExpense(input);
    resetInput();
    router.navigate("/");
  };

  return (
    <>
      <TopBarClose
        icon="trash-can"
        iconSize={20}
        onClose={onDelete}
        disabled={!isDirty}
      />
      <SafeView style={styles.root}>
        <DismissKeyboardView style={styles.formContainer}>
          <InputStoreProvider<AddExpenseInput> useInput={useAddExpenseInput}>
            <AmountInput />
            <NoteInput />
            <CategoryInput />
            <DateInput />
            <TagsInput />
            <ActionBar action="Add Expense" onAction={onAddExpense} />
          </InputStoreProvider>
        </DismissKeyboardView>
      </SafeView>
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
