import { StyleSheet } from "react-native";
import { useExpenseStore } from "@/store/expenses";
import { FilterBar } from "./components/FilterBar";
import SafeScrollView from "@/components/SafeScrollView";
import ListExpensesByDay from "./components/ListExpensesByDay";
import Spacer from "@/components/Separator copy";
import TotalAmountDisplay from "./components/TotalAmountDisplay";
import { countTotalAmount } from "./utils/expense";

export interface ListExpensesProps {}

export default function ListExpenses(props: ListExpensesProps) {
  const { expenses } = useExpenseStore();

  return (
    <>
      <FilterBar />
      <SafeScrollView style={styles.root}>
        <TotalAmountDisplay expenses={expenses} />
        <ListExpensesByDay expenses={expenses} />
        <Spacer space={64} />
      </SafeScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "column",
    paddingVertical: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
