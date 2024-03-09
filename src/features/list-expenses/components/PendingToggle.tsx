import { Pill } from "@/components/Pill";
import { EXPENSE_TYPE, useExpenseFilters } from "@/store/expenses";
import { View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

export default function PendingToggle() {
  const [selectedType, setSelectedType] = useExpenseFilters("type");
  return (
    <View style={styles.root} backgroundDef={"background2"}>
      <TogglePill
        value="All"
        onPress={() => setSelectedType(null)}
        isSelected={selectedType === null}
      />
      <TogglePill
        value="Pending"
        onPress={() => setSelectedType(EXPENSE_TYPE.pending)}
        isSelected={selectedType === EXPENSE_TYPE.pending}
      />
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
