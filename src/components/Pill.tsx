import { StyleSheet } from "react-native";

import { Icon, Text, View } from "@/theme/components/Themed";
import { useColors } from "@/theme/hooks/useColors";

export type PillProps = {
  value: string;
  onClose?: () => void;
};

export function Pill(props: PillProps) {
  const colors = useColors();
  return (
    <View
      style={{ ...styles.root, backgroundColor: colors.background3 }}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <Text>{props.value}</Text>
      {props.onClose && <Icon name="circle-xmark" onPress={props.onClose} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "auto",
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 12,
    borderRadius: 12,
    borderColor: "#ffff",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
