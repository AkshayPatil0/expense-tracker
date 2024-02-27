import { StyleSheet } from "react-native";

import { FormInputContainer } from "@/components/form/FormInputContainer";
import FormInputMultiPicker from "@/components/form/FormInputMultiPicker";
import { tags } from "@/store/tag";

export default function TagsInput() {
  return (
    <FormInputContainer label="Tags" icon="hashtag">
      <FormInputMultiPicker
        items={tags.map<{ label: string; value: string }>((tag) => ({
          label: tag,
          value: tag,
        }))}
        placeholder="Select multiple a tags"
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
