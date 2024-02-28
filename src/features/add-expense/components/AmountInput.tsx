import { StyleSheet } from "react-native";

import { FormInputText } from "@/components/form/FormInputText";
import { FormInputContainer } from "@/components/form/FormInputContainer";
// import { inputAmountSignal } from "../store/add-expense-input";
import { useSignal } from "@preact/signals-react";
import { useAddExpenseInput } from "../store/add-expense-input";

export type AmountInputProps = {};

export function AmountInput(props: AmountInputProps) {
  // const inputAmountSignal = useSignal(0);
  const [amount, setAmount] = useAddExpenseInput("amount");

  const handleChangeAmount = (value: number) => {
    // inputAmountSignal.value = amount;
    setAmount(value);
  };

  return (
    <FormInputContainer label="Amount" icon="indian-rupee-sign">
      <FormInputText
        value={amount}
        onChange={handleChangeAmount}
        placeholder="Enter amount"
        numeric
      />
    </FormInputContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    width: "100%",
    height: 112,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    flexShrink: 0,
  },
  label: {
    alignSelf: "stretch",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 24,
  },
  labelContainer: {
    width: "100%",
    height: 32,
    paddingBottom: 8,
    flexDirection: "column",
    alignItems: "flex-start",
    flexShrink: 0,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    alignItems: "center",
    flexShrink: 0,
  },
  textInput: {
    width: "100%",
    height: "100%",
    padding: 16,
    paddingRight: 34,
    fontSize: 16,
    borderRadius: 12,
  },
  inputIcon: {
    position: "absolute",
    right: 16,
  },
});
