import { StyleSheet } from "react-native";

import { FormInputContainer } from "@/components/form/FormInputContainer";
import FormInputPicker, {
  FormInputPickerProps,
} from "@/components/form/FormInputPicker";
import { useCategoryStore } from "@/store/category/store";
import { AddExpenseInput } from "../store/add-expense-input";
import { useInputFromStore } from "@/providers/input-store/InputStoreContext";

export default function CategoryInput<I extends AddExpenseInput>() {
  const { categories } = useCategoryStore();
  const [categoryId, setCategoryId] = useInputFromStore<I, "categoryId">(
    "categoryId"
  );

  const handleCategoryChange = (value: string) => {
    setCategoryId(+value);
  };
  return (
    <FormInputContainer label="Category" icon="list">
      <FormInputPicker
        items={categories.map<FormInputPickerProps["items"][0]>((category) => ({
          label: `${category.icon} ${category.name}`,
          value: category.id.toString(),
        }))}
        placeholder="Select a category"
        value={categoryId.toString()}
        onChange={handleCategoryChange}
      />
    </FormInputContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
  },
});
