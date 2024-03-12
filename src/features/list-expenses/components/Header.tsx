import { StyleSheet } from "react-native";
import { TopBar } from "@/components/TopBar";
import { IconButton } from "@/components/IconButton";
import { View } from "@/theme/components/Themed";
import { FilterBar } from "./FilterBar";
import Spacer from "@/components/Spacer";
import { useState } from "react";
import { useExpenseStore } from "@/store/expenses";
import PendingToggle from "./PendingToggle";
import { router } from "expo-router";

export function Header() {
  const [openFilter, setOpenFilter] = useState(false);
  const { filter } = useExpenseStore();
  return (
    <TopBar useSafeArea>
      <>
        <View style={styles.root}>
          <IconButton
            style={styles.button}
            padding={12}
            icon="magnifying-glass"
            size={20}
            onPress={() => router.navigate("/search")}
          />
          <PendingToggle />
          <IconButton
            style={styles.button}
            padding={12}
            icon="filter"
            size={20}
            onPress={() => setOpenFilter((open) => !open)}
            badge={filter.categories.length + filter.tags.length}
          />
        </View>
        {openFilter && (
          <>
            <FilterBar />
            <Spacer space={16} />
          </>
        )}
      </>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
