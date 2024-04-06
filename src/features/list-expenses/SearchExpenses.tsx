import { StyleSheet } from "react-native";
import Spacer from "@/components/layout/Spacer";
import NoExpensesFound from "./components/NoExpensesFound";
import { TopBar } from "@/components/layout/TopBar";
import { ScrollView } from "@/theme/components/Themed";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import ListExpensesByDay from "./components/ListExpensesByDay";
import { useSearchedExpenses } from "./hooks/useSearchedExpenses";

export default function SearchExpenses() {
  const [search, setSearch] = useState("");

  const searchResult = useSearchedExpenses(search);

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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
