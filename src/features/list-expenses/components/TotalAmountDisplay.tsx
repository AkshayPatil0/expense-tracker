import { Pill } from "@/components/Pill";
import { Expense } from "@/store/expenses";
import { Text, View } from "@/theme/components/Themed";
import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { countTotalAmount } from "../utils/expense";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export interface TotalAmountDisplayProps {
  expenses: Expense[];
}

const SPENT_BY = {
  today: "today",
  week: "this week",
  month: "this month",
  year: "this year",
  all: "all time",
} as const;

const isDateInCurrent =
  (unit: "day" | "week" | "month" | "year") => (date: Date) => {
    const startDate = dayjs().startOf(unit);
    const endDate = dayjs().endOf(unit);

    return dayjs(date).isBetween(startDate, endDate);
  };

export default function TotalAmountDisplay(props: TotalAmountDisplayProps) {
  const [spentBy, setSpentBy] = useState<
    (typeof SPENT_BY)[keyof typeof SPENT_BY]
  >(SPENT_BY.all);

  const total = useMemo(() => {
    switch (spentBy) {
      case SPENT_BY.today:
        return countTotalAmount(
          props.expenses.filter((expense) =>
            isDateInCurrent("day")(expense.date)
          )
        );

      case SPENT_BY.week:
        return countTotalAmount(
          props.expenses.filter((expense) =>
            isDateInCurrent("week")(expense.date)
          )
        );

      case SPENT_BY.month:
        return countTotalAmount(
          props.expenses.filter((expense) =>
            isDateInCurrent("month")(expense.date)
          )
        );
      case SPENT_BY.year:
        return countTotalAmount(
          props.expenses.filter((expense) =>
            isDateInCurrent("year")(expense.date)
          )
        );

      default:
        return countTotalAmount(props.expenses);
    }
  }, [props.expenses, spentBy]);

  return (
    <View style={style.root}>
      <Text style={style.label}>Total spent</Text>
      <View style={style.pillContainer}>
        {Object.values(SPENT_BY).map((val) => (
          <Pill
            value={val}
            onPress={() => setSpentBy(val)}
            background={spentBy === val ? "background2" : "background3"}
          />
        ))}
      </View>
      <Text style={style.amount}>₹ {total}</Text>
    </View>
  );
}

export const style = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingBottom: 32,
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  pillContainer: {
    flexDirection: "row",
    gap: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: "900",
  },
});
