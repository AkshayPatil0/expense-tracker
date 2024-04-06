import { Pill } from "@/components/Pill";
import { View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

export interface PillToggleProps<V> {
  items: Array<{ label: string; value: V }>;
  value: V;
  onChange: (value: V) => void;
}

export default function PillToggle<V>(props: PillToggleProps<V>) {
  return (
    <View style={styles.root} backgroundDef={"background2"}>
      {props.items.map((item) => (
        <TogglePill
          key={item.label}
          value={item.label}
          onPress={() => props.onChange(item.value)}
          isSelected={props.value === item.value}
        />
      ))}
    </View>
  );
}

function TogglePill(props: {
  value: string;
  onPress: (value: string) => void;
  isSelected: boolean;
}) {
  return (
    <Pill
      size={12}
      fullWidth
      value={props.value}
      onPress={() => props.onPress(props.value)}
      background={props.isSelected ? "background" : "background2"}
      color={props.isSelected ? "tint" : "disabledText"}
      fontWeight={props.isSelected ? "700" : "400"}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 10,
    // width: "100%",
    flex: 1,
    padding: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
});
