import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Icon, View } from "@/theme/components/Themed";
import { useColors } from "@/theme/hooks/useColors";
import { SubmitButton } from "@/components/form/SubmitButton";

export interface ActionBarProps {
  testID?: string;
}

export function ActionBar(props: ActionBarProps) {
  return (
    <View style={styles.root}>
      <SubmitButton title="Add Expense" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
    // justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
