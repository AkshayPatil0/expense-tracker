import { View as ThemedView } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";
import Separator from "@/components/layout/Separator";
import { Fragment } from "react";
import EditableListItem from "./EditableListItem";
import { useTagStore } from "@/store/tag";

export default function TagMenuOptions() {
  const { tags, deleteTag } = useTagStore();
  return (
    <ThemedView style={styles.options} backgroundDef="background3">
      {tags.map((tag, i) => (
        <Fragment key={tag}>
          <EditableListItem
            label={tag}
            icon={"#"}
            onEdit={() => {}}
            onDelete={() => deleteTag(tag)}
            disableEdit
          />
          {i < tags.length - 1 ? <Separator color="background2" /> : null}
        </Fragment>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  options: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 10,
    borderRadius: 5,
  },
});
