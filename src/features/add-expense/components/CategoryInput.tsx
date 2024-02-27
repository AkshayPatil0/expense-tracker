import { StyleSheet } from "react-native";

import { useState } from "react";
import { FormInputContainer } from "@/components/form/FormInputContainer";
import FormInputDate from "@/components/form/FormInputDate";
import FormInputPicker from "@/components/form/FormInputPicker";
import { categories } from "@/store/category";

export default function CategoryInput() {
  return (
    <FormInputContainer label="Category" icon="list">
      <FormInputPicker
        items={categories.map((category) => ({
          label: `${category.icon} ${category.name}`,
          value: category.id,
        }))}
        placeholder="Select a category"
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
