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
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
});
