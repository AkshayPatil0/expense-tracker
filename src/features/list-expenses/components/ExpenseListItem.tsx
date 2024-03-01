import { getIconByCategory } from "@/store/category";
import { Expense } from "@/store/expenses";
import { Text, View } from "@/theme/components/Themed";
import dayjs from "dayjs";
import { StyleSheet } from "react-native";

export interface ExpenseListItemProps {
  expense: Expense;
}

export default function ExpenseListItem(props: ExpenseListItemProps) {
  const { expense } = props;
  return (
    <View style={style.root}>
      <View style={style.iconContainer} backgroundDef="background2">
        <Text adjustsFontSizeToFit numberOfLines={1} style={style.icon}>
          {getIconByCategory(expense.category)}
        </Text>
      </View>
      <View style={style.noteTimeContainer}>
        <Text style={style.note}>{expense.note}</Text>
        <Text style={style.time} colorDef="disabledText">
          {dayjs(expense.date).format("hh:mm A")} {}
        </Text>
      </View>
      <View style={style.amountContainer}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={style.amount}>
          ₹ {expense.amount}
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    flexDirection: "row",
    // paddingVertical: 16,
    gap: 8,
    height: 50,
  },
  iconContainer: {
    height: "100%",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    textAlign: "center",
    height: "100%",
    aspectRatio: 1,
    fontSize: 100,
  },
  noteTimeContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  note: {
    fontSize: 16,
    fontWeight: "600",
  },
  time: {},
  amountContainer: {},
  amount: {
    paddingVertical: 16,
    textAlign: "center",
    height: "100%",
    fontSize: 18,
    fontWeight: "700",
  },
});
