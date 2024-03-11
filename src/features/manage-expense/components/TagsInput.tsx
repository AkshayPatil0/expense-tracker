import { StyleSheet } from "react-native";

import { FormInputContainer } from "@/components/form/FormInputContainer";
import FormInputMultiPicker from "@/components/form/FormInputMultiPicker";
import { tags } from "@/store/tag";
import {
  AddExpenseInput,
  useAddExpenseInput,
} from "../store/add-expense-input";
import { useInputFromStore } from "@/providers/input-store/InputStoreContext";

export default function TagsInput<I extends AddExpenseInput>() {
  const [selectedTags, setSelectedTags] = useInputFromStore<I, "tags">("tags");

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  return (
    <FormInputContainer label="Tags" icon="hashtag">
      <FormInputMultiPicker
        items={tags.map<{ label: string; value: string }>((tag) => ({
          label: tag,
          value: tag,
        }))}
        placeholder="Select multiple a tags"
        values={selectedTags}
        onChange={handleTagsChange}
      />
    </FormInputContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F5FCFF",
  },
});
