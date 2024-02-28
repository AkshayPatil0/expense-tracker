import { StyleSheet } from "react-native";

import { FormInputContainer } from "@/components/form/FormInputContainer";
import FormInputDate from "@/components/form/FormInputDate";
import { useAddExpenseInput } from "../store/add-expense-input";

export default function DateInput() {
  const [date, setDate] = useAddExpenseInput("date");

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
