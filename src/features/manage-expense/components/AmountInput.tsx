import { StyleSheet } from "react-native";

import { FormInputText } from "@/components/form/FormInputText";
import { FormInputContainer } from "@/components/form/FormInputContainer";
import { AddExpenseInput } from "../store/add-expense-input";
import { useInputFromStore } from "@/providers/input-store/InputStoreContext";

export type AmountInputProps = {};

export function AmountInput<I extends AddExpenseInput>(
  props: AmountInputProps
) {
  const [amount, setAmount] = useInputFromStore<I, "amount">("amount");

  const handleChangeAmount = (value: number) => {
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
