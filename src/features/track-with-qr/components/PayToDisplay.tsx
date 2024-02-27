import { StyleSheet } from "react-native";

import { useState } from "react";
import { FormInputText } from "@/components/form/FormInputText";
import { FormInputContainer } from "@/components/form/FormInputContainer";
import { DecodedUpiQr } from "../services/upiQrService";

export interface PayToDisplayProps {
  decodedQr: DecodedUpiQr;
}

export default function PayToDisplay(props: PayToDisplayProps) {
  return (
    <FormInputContainer label="Pay to">
      <FormInputText
        placeholder=""
        value={`${props.decodedQr.pn} [${props.decodedQr.pa}]`}
        disabled
      />
    </FormInputContainer>
  );
}

const styles = StyleSheet.create({});
