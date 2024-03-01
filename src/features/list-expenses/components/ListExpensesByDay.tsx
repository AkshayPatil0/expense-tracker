import ListContainer from "@/components/ListContainer";
import { Expense } from "@/store/expenses";
import { Text, View } from "@/theme/components/Themed";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import ExpensesList from "./ExpensesList";
import { countTotalAmount } from "../utils/expense";
import dayjs, { Dayjs } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
export interface DayListContainerProps {
  expenses: Expense[];
}

const formatDay = (date: Dayjs) => {
  if (date.isToday()) return "Today";
  if (date.isYesterday()) return "Yesterday";

  return date.format("ddd, D MMM").toUpperCase();
  //
};

export default function ListExpensesByDay(props: DayListContainerProps) {
  const sortedList = useMemo(() => {
    const listByDayMap = props.expenses.reduce<Record<string, Expense[]>>(
      (res, expense) => {
        const day = dayjs(expense.date).startOf("day").toString();

        return {
          ...res,
          [day]: [...(res[day] || []), expense],
        };
      },
      {}
    );

    return Object.entries(listByDayMap)
      .map((entry) => ({
        day: dayjs(entry[0]),
        expenses: entry[1],
      }))
      .sort((record1, record2) => {
        return record1.day.isAfter(record2.day) ? -1 : 1;
      });
  }, [props.expenses]);

  return (
    <View style={style.root}>
      {sortedList.map((record) => (
        <ListContainer
          key={record.day.toString()}
          title={
            <Text style={style.title} colorDef="disabledText">
              {formatDay(record.day)}
            </Text>
          }
          rightInfo={
            <Text style={style.title} colorDef="disabledText">
              ₹ {countTotalAmount(record.expenses)}
            </Text>
          }
        >
          <ExpensesList expenses={record.expenses} />
        </ListContainer>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  total: {},
});
