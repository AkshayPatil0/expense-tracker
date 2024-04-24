import { StyleSheet, View } from "react-native";
import { EMOJI_CATEGORIES } from "./emoji-data";
import { IconButton } from "../IconButton";

export interface EmojiCategorySelectorProps {
  selectedCategoryIndex: number;
  selectCategory: (i: number) => void;
}

export default function EmojiCategorySelector(
  props: EmojiCategorySelectorProps
) {
  return (
    <View style={styles.root}>
      {EMOJI_CATEGORIES.map(([category, icon], i) => {
        return (
          <IconButton
            key={category}
            icon={icon}
            size={16}
            color={props.selectedCategoryIndex === i ? "tint" : "disabledText"}
            onPress={() => {
              props.selectCategory(i);
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
  },
});
