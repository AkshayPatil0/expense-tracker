import { StyleSheet } from "react-native";

import { FormInputContainer } from "@/components/form/FormInputContainer";
import FormInputDate from "@/components/form/FormInputDate";
import {
  AddExpenseInput,
  useAddExpenseInput,
} from "../store/add-expense-input";
import { useInputFromStore } from "@/providers/input-store/InputStoreContext";
import { useMemo } from "react";

export default function DateInput<I extends AddExpenseInput>() {
  const [_date, setDate] = useInputFromStore<I, "date">("date");

  const date = useMemo(() => new Date(_date), [_date]);
  const handleDateChange = (value: Date) => {
    setDate(value);
  };
  return (
    <FormInputContainer label="Date" icon="calendar-days">
      <FormInputDate value={date} onChange={handleDateChange} />
    </FormInputContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
  },
});
