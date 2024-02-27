import { StyleSheet } from "react-native";

import { useState } from "react";
import { FormInputContainer } from "@/components/form/FormInputContainer";
import FormInputDate from "@/components/form/FormInputDate";

export default function DateInput() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <FormInputContainer label="Date" icon="calendar-days">
      <FormInputDate />
    </FormInputContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F5FCFF",
  },
});
