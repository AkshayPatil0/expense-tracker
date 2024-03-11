import { StyleSheet } from "react-native";
import { View } from "@/theme/components/Themed";
import { SubmitButton } from "@/components/form/SubmitButton";

export interface ActionBarProps {
  testID?: string;
  action: string;
  onAction: () => void;
}

export function ActionBar(props: ActionBarProps) {
  return (
    <View style={styles.root}>
      <SubmitButton title={props.action} onSubmit={props.onAction} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: "flex-start",
  },
});
