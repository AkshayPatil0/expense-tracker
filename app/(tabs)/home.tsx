import { StyleSheet } from "react-native";

import { Text, View } from "@/theme/components/Themed";
import { useExpenseStore } from "@/store/expenses";

export default function HomeScreen() {
  const { expenses } = useExpenseStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses - {JSON.stringify(expenses)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
