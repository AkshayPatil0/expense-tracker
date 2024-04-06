import PillToggle from "@/components/PillToggle";
import { EXPENSE_TYPE, useExpenseFilters } from "@/store/expenses";
import { StyleSheet } from "react-native";

export default function PendingToggle() {
  const [selectedType, setSelectedType] = useExpenseFilters("type");
  return (
    <PillToggle<(typeof EXPENSE_TYPE)["pending"] | null>
      items={[
        {
          label: "All",
          value: null,
        },
        {
          label: "Pending",
          value: EXPENSE_TYPE.pending,
        },
      ]}
      value={selectedType === EXPENSE_TYPE.pending ? selectedType : null}
      onChange={(value) => setSelectedType(value)}
    />
  );
}

const styles = StyleSheet.create({});
