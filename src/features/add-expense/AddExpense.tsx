import { Button, StyleSheet } from "react-native";
import { ScrollView, Text, View } from "@/theme/components/Themed";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateInput from "@/features/add-expense/components/DateInput";
import { AmountInput } from "./components/AmountInput";
import { ActionBar } from "./components/ActionBar";
import NoteInput from "./components/NoteInput";
import CategoryInput from "./components/CategoryInput";
import TagsInput from "./components/TagsInput";
import { TopBar } from "@/components/TopBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SafeScrollView from "@/components/SafeScrollView";
import SafeView from "@/components/SafeView";

// Define interface for expense data
interface Expense {
  date: Date;
  amount: number;
  category: string;
  paidTo?: string;
}

export default function AddExpense(props: AddExpenseProps) {
  const [height, setHeight] = useState<number>();
  const safeAreaInsets = useSafeAreaInsets();
  const onDelete = () => {};
  return (
    <>
      <TopBar icon="trash-can" iconSize={20} onPress={onDelete} />
      <SafeView style={styles.root}>
        {/* <ScrollView
          style={{
            flex: 1,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formContainer}
        > */}
        <View style={styles.formContainer}>
          <AmountInput />
          <NoteInput />
          <CategoryInput />
          <DateInput />
          <TagsInput />
          <ActionBar />
        </View>
        {/* </ScrollView> */}
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
