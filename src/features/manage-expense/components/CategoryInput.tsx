import { StyleSheet } from "react-native";

import { FormInputContainer } from "@/components/form/FormInputContainer";
import FormInputPicker from "@/components/form/FormInputPicker";
import { categories } from "@/store/category";
import { AddExpenseInput } from "../store/add-expense-input";
import { useInputFromStore } from "@/providers/input-store/InputStoreContext";

export default function CategoryInput<I extends AddExpenseInput>() {
  const [category, setCategory] = useInputFromStore<I, "category">("category");

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };
  return (
    <FormInputContainer label="Category" icon="list">
      <FormInputPicker
        items={categories.map((category) => ({
          label: `${category.icon} ${category.name}`,
          value: category.id,
        }))}
        placeholder="Select a category"
        value={category}
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
