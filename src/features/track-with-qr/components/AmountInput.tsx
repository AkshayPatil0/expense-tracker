import { StyleSheet } from "react-native";

import { useState } from "react";
import { FormInputText } from "@/components/form/FormInputText";
import { FormInputContainer } from "@/components/form/FormInputContainer";
import { DecodedUpiQr } from "../services/upiQrService";

export interface AmountInputProps {
  decodedQr: DecodedUpiQr;
}

export default function AmountInput(props: AmountInputProps) {
  const [amount, setAmount] = useState<number>();

  const handleChangeAmount = (text: number) => {
    setAmount(text);
  };

  return (
    <FormInputContainer label="Amount">
      <FormInputText
        placeholder="Enter amount"
        value={amount}
        onChange={handleChangeAmount}
        numeric
      />
    </FormInputContainer>
  );
}

const styles = StyleSheet.create({});
