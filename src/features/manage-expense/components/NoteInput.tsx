import { StyleSheet } from "react-native";

import { FormInputText } from "@/components/form/FormInputText";
import { FormInputContainer } from "@/components/form/FormInputContainer";
import {
  AddExpenseInput,
  useAddExpenseInput,
} from "../store/add-expense-input";
import { useInputFromStore } from "@/providers/input-store/InputStoreContext";

export default function NoteInput<I extends AddExpenseInput>() {
  const [note, setNote] = useInputFromStore<I, "note">("note");

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
