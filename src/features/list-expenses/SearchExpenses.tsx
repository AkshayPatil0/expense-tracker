import { StyleSheet } from "react-native";
import { useExpenseStore } from "@/store/expenses";
import Spacer from "@/components/Spacer";
import NoExpensesFound from "./components/NoExpensesFound";
import { TopBar } from "@/components/TopBar";
import { ScrollView, TextInput, View } from "@/theme/components/Themed";
import SearchBar from "./components/SearchBar";
import { useMemo, useState } from "react";
import { searchExpenses, sortExpenses } from "./utils/expense";
import ListExpensesByDay from "./components/ListExpensesByDay";

export default function SearchExpenses() {
  const { expenses } = useExpenseStore();
  const [search, setSearch] = useState("");

  const searchResult = useMemo(
    () => sortExpenses(searchExpenses(expenses, search)),
    [expenses, search]
  );

  return (
    <>
      <TopBar>
        <SearchBar search={search} onChange={setSearch} />
      </TopBar>
      <ScrollView style={styles.root}>
        <Spacer space={32} />
        {!!searchResult.length ? (
          <ListExpensesByDay expenses={searchResult} />
        ) : (
          <NoExpensesFound type="search" />
        )}
        <Spacer space={64} />
      </ScrollView>
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
  listContainer: {
    paddingHorizontal: 20,
  },
});
