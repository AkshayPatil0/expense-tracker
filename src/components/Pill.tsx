import { StyleSheet } from "react-native";

import {
  ColorDefinition,
  Icon,
  Text,
  TouchableOpacity,
  View,
} from "@/theme/components/Themed";
import { useColors } from "@/theme/hooks/useColors";

export type PillProps = {
  value: string;
  background?: ColorDefinition;
  onPress?: () => void;
  onClose?: () => void;
};

export function Pill(props: PillProps) {
  const colors = useColors();
  return (
    <TouchableOpacity
      style={styles.root}
      backgroundDef={props.background ? props.background : "background3"}
      onPress={props.onPress}
    >
      <Text style={styles.value}>{props.value}</Text>
      {props.onClose && <Icon name="circle-xmark" onPress={props.onClose} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "auto",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 12,
    borderColor: "#ffff",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  value: {
    fontSize: 12,
  },
});
