import { StyleSheet } from "react-native";

import { FormInputContainer } from "@/components/form/FormInputContainer";
import FormInputMultiPicker from "@/components/form/FormInputMultiPicker";
import { tags } from "@/store/tag";
import { useAddExpenseInput } from "../store/add-expense-input";

export default function TagsInput() {
  const [selectedTags, setSelectedTags] = useAddExpenseInput("tags");

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
