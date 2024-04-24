import { StyleSheet } from "react-native";

import { FormInputContainer } from "@/components/form/FormInputContainer";
import FormInputMultiPicker from "@/components/form/FormInputMultiPicker";
import { AddExpenseInput } from "../store/add-expense-input";
import { useInputFromStore } from "@/providers/input-store/InputStoreContext";
import { useTagStore } from "@/store/tag";

export default function TagsInput<I extends AddExpenseInput>() {
  const [selectedTags, setSelectedTags] = useInputFromStore<I, "tags">("tags");

  const { tags } = useTagStore();

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
