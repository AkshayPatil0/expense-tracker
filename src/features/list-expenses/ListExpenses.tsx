import { StyleSheet } from "react-native";
import { useExpenseStore, useFilteredExpenses } from "@/store/expenses";
import SafeScrollView from "@/components/SafeScrollView";
import ListExpensesByDay from "./components/ListExpensesByDay";
import Spacer from "@/components/Spacer";
import TotalAmountDisplay from "./components/TotalAmountDisplay";
import { Header } from "./components/Header";
import { useMemo } from "react";
import PendingToggle from "./components/PendingToggle";
import NoExpensesFound from "./components/NoExpensesFound";

export interface ListExpensesProps {}

export default function ListExpenses(props: ListExpensesProps) {
  const expenses = useFilteredExpenses();
  return (
    <>
      <Header />
      <SafeScrollView style={styles.root}>
        <Spacer space={32} />
        {!!expenses.length ? (
          <>
            <TotalAmountDisplay expenses={expenses} />
            <ListExpensesByDay expenses={expenses} />
          </>
        ) : (
          <NoExpensesFound />
        )}
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
