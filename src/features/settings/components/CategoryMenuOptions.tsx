import { View as ThemedView } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";
import Separator from "@/components/layout/Separator";
import { Fragment } from "react";
import { useCategoryStore } from "@/store/category";
import EditableListItem from "./EditableListItem";

export default function CategoryMenuOptions() {
  const { categories, editCategory, deleteCategory } = useCategoryStore();
  return (
    <ThemedView style={styles.options} backgroundDef="background3">
      {categories.map((category, i) => (
        <Fragment key={category.id}>
          <EditableListItem
            label={category.name}
            icon={category.icon}
            key={category.id}
            onEdit={(item) =>
              editCategory({
                id: category.id,
                icon: item.icon,
                name: item.label,
              })
            }
            onDelete={() => deleteCategory(category.id)}
          />
          {i < categories.length - 1 ? <Separator color="background2" /> : null}
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
