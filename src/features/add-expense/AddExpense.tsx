import { StyleSheet, Alert } from "react-native";
import { View } from "@/theme/components/Themed";
import DateInput from "@/features/add-expense/components/DateInput";
import { AmountInput } from "./components/AmountInput";
import { ActionBar } from "./components/ActionBar";
import NoteInput from "./components/NoteInput";
import CategoryInput from "./components/CategoryInput";
import TagsInput from "./components/TagsInput";
import { TopBar } from "@/components/TopBar";
import SafeView from "@/components/SafeView";
import { useAddExpenseInputStore } from "./store/add-expense-input";
import { TopBarClose } from "@/components/TopBarClose";

export default function AddExpense(props: AddExpenseProps) {
  const { resetInput, isDirty } = useAddExpenseInputStore();
  const onDelete = () => {
    if (isDirty) {
      Alert.alert("Are you sure ?", "This will reset all input fields", [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: resetInput,
          isPreferred: true,
        },
      ]);
    }
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
        <View style={styles.formContainer}>
          <AmountInput />
          <NoteInput />
          <CategoryInput />
          <DateInput />
          <TagsInput />
          <ActionBar />
        </View>
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
