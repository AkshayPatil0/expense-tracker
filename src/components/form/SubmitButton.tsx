import { StyleSheet, TouchableOpacity } from "react-native";

import { useColors } from "@/theme/hooks/useColors";
import { PrimaryButton } from "../PrimaryButton";

export type SubmitButtonProps = {
  title: string;
  onSubmit?: () => void;
};

export function SubmitButton(props: SubmitButtonProps) {
  return (
    <PrimaryButton
      style={styles.root}
      title={props.title}
      onPress={props.onSubmit}
      titleProps={{
        style: styles.title,
      }}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    borderColor: "#ffff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  title: {
    alignSelf: "stretch",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 24,
  },
});
