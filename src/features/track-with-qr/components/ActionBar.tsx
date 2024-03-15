import { Linking, StyleSheet } from "react-native";
import { View } from "@/theme/components/Themed";
import { UpiApps, generateUpiDeepLink } from "../services/upiQrService";
import { SubmitButton } from "@/components/form/SubmitButton";
import { useDecodedQr } from "../store/decoded-qr";
import {
  usePendingExpenseInput,
  usePendingExpenseInputStore,
} from "../store/pending-expense-input";
import { usePayTo } from "../hooks/usePayTo";
import { addPendingExpense } from "@/store/expenses/actions";

export interface ActionBarProps {}

export function ActionBar(props: ActionBarProps) {
  const { decodedQr, setDecodedQr } = useDecodedQr();
  const [amount] = usePendingExpenseInput("amount");
  const { resetInput } = usePendingExpenseInputStore();
  const payTo = usePayTo();

  const handleSubmit = async () => {
    if (!decodedQr) return;
    const upiDeepLink = generateUpiDeepLink(
      {
        ...decodedQr,
        am: amount,
      },
      UpiApps.phonepe
    );
    setDecodedQr(null);
    await addPendingExpense({
      amount,
      paidTo: payTo,
      date: new Date(),
    });
    resetInput();
    Linking.openURL(upiDeepLink);
  };
  return (
    <View style={styles.root}>
      <SubmitButton title="Pay now and Track later" onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
    padding: 16,
    paddingTop: 24,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
