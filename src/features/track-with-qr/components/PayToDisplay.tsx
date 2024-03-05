import { StyleSheet } from "react-native";

import { FormInputText } from "@/components/form/FormInputText";
import { FormInputContainer } from "@/components/form/FormInputContainer";
import { usePayTo } from "../hooks/usePayTo";

export interface PayToDisplayProps {}

export default function PayToDisplay(props: PayToDisplayProps) {
  const payTo = usePayTo();

  return (
    <FormInputContainer label="Pay to">
      <FormInputText placeholder="" value={payTo} disabled />
    </FormInputContainer>
  );
}

const styles = StyleSheet.create({});
