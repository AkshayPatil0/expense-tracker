import { Button, Linking, StyleSheet } from "react-native";

import { View } from "@/theme/components/Themed";
import { useNavigation } from "expo-router";
import { useState } from "react";
import {
  DecodedUpiQr,
  UpiApps,
  generateUpiDeepLink,
} from "../services/upiQrService";
import { FormInputContainer } from "@/components/form/FormInputContainer";
import { FormInputText } from "@/components/form/FormInputText";
import PayToDisplay from "../components/PayToDisplay";
import AmountInput from "../components/AmountInput";
import { ActionBar } from "../components/ActionBar";
import { TopBar } from "@/components/TopBar";
import SafeView from "@/components/SafeView";
import { TopBarClose } from "@/components/TopBarClose";

// Define interface for expense data
interface Expense {
  date: Date;
  amount: number;
  category: string;
  paidTo?: string;
}

export interface ScannedQrStageProps {
  decodedQr: DecodedUpiQr;
  onCancel: () => void;
}
export default function ScannedQrStageScreen(props: ScannedQrStageProps) {
  const navigation = useNavigation();

  const [amount, setAmount] = useState<number>(0);

  const handleAmountChange = (value: number) => {
    setAmount(value);
  };

  const onCancel = () => {
    props.onCancel();
  };

  return (
    <>
      <TopBarClose onClose={onCancel} />
      <SafeView style={styles.root}>
        <View style={styles.container}>
          <PayToDisplay decodedQr={props.decodedQr} />
          <AmountInput decodedQr={props.decodedQr} />
          <ActionBar decodedQr={props.decodedQr} amount={100} />
        </View>
      </SafeView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 48,
    gap: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
