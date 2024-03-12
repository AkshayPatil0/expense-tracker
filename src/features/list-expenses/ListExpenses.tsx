import { StyleSheet } from "react-native";
import { useFilteredExpenses } from "@/store/expenses";
import SafeScrollView from "@/components/SafeScrollView";
import ListExpensesByDay from "./components/ListExpensesByDay";
import Spacer from "@/components/Spacer";
import TotalAmountDisplay from "./components/TotalAmountDisplay";
import { Header } from "./components/Header";
import NoExpensesFound from "./components/NoExpensesFound";

export default function ListExpenses() {
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
