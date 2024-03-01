import { Pressable, StyleSheet, View } from "react-native";

import {
  ColorDefinition,
  Icon,
  Text,
  TouchableOpacity,
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
      {props.onClose && (
        <Pressable style={styles.closeContainer} onPress={props.onClose}>
          <Icon name="circle-xmark" />
        </Pressable>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "auto",
    borderRadius: 12,
    borderColor: "#ffff",
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 12,

    paddingLeft: 8,
    paddingVertical: 8,
  },
  closeContainer: {
    paddingRight: 8,
    paddingLeft: 4,
    paddingVertical: 8,
  },
});
