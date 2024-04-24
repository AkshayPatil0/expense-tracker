import { Text, View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
});
