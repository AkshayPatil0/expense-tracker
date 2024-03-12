import { Icon, Text, View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

export default function NoExpensesFound(props: { type: "filter" | "search" }) {
  return (
    <View style={styles.root}>
      <Icon size={100} name="face-frown" />
      <Text style={styles.text} colorDef={"iconDefault"}>
        No expenses found !
      </Text>
      <Text style={styles.subText} colorDef={"iconDefault"}>
        {props.type === "filter"
          ? "You might wanna change the applied filters."
          : "You might wanna search with different keyword."}
      </Text>
    </View>
  );
}

NoExpensesFound.defaultProps = {
  type: "filter",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    paddingVertical: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  text: {
    fontSize: 20,
    paddingTop: 32,
    fontWeight: "700",
  },
  subText: {
    fontSize: 16,
  },
});
