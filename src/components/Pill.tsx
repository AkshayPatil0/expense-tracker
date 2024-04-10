import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from "react-native";

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
  size?: number;
  fontWeight?: TextStyle["fontWeight"];
  fullWidth?: boolean;
  color?: ColorDefinition;
};

export function Pill(props: PillProps) {
  return (
    <TouchableOpacity
      style={[
        styles.root,
        props.fullWidth
          ? { flex: 1, justifyContent: "center", alignItems: "center" }
          : {},
      ]}
      backgroundDef={props.background ? props.background : "background3"}
      onPress={props.onPress}
    >
      <Text
        style={[
          styles.value,
          props.size ? { fontSize: props.size } : {},
          props.fontWeight ? { fontWeight: props.fontWeight } : {},
        ]}
        colorDef={props.color}
      >
        {props.value}
      </Text>
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
    borderRadius: 12,
    borderColor: "#ffff",
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 12,
    padding: 8,
  },
  closeContainer: {
    paddingRight: 8,
    paddingLeft: 4,
    paddingVertical: 8,
    marginLeft: -8,
  },
});
