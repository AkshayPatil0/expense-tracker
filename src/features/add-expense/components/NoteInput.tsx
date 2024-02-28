import { StyleSheet } from "react-native";

import { FormInputText } from "@/components/form/FormInputText";
import { FormInputContainer } from "@/components/form/FormInputContainer";
import { useAddExpenseInput } from "../store/add-expense-input";

export default function NoteInput() {
  const [note, setNote] = useAddExpenseInput("note");

  const handleNoteChange = (value: string) => {
    setNote(value);
  };

  return (
    <FormInputContainer label="Note" icon="note-sticky">
      <FormInputText
        value={note}
        onChange={handleNoteChange}
        placeholder="Add Note"
      />
    </FormInputContainer>
  );
}

const styles = StyleSheet.create({});
