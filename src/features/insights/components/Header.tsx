import { Text, View } from "@/theme/components/Themed";
import TimeSpanToggle from "./TimeSpanToggle";
import { StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Insights</Text>
      <TimeSpanToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
});
