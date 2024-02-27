import { StyleSheet } from "react-native";

import { useState } from "react";
import { FormInputText } from "@/components/form/FormInputText";
import { FormInputContainer } from "@/components/form/FormInputContainer";

export default function NoteInput() {
  const [note, setNote] = useState<string>("");

  const handleChangeNote = (text: string) => {
    setNote(text);
  };

  return (
    <FormInputContainer label="Note" icon="note-sticky">
      <FormInputText
        value={note}
        onChange={handleChangeNote}
        placeholder="Add Note"
      />
    </FormInputContainer>
  );
}

const styles = StyleSheet.create({});
