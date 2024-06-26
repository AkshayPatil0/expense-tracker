import ListContainer from "@/components/ListContainer";
import { Expense, PendingExpense } from "@/store/expenses";
import { Text, View } from "@/theme/components/Themed";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import ExpensesList from "./ExpensesList";
import { countTotalAmount, sortExpenses } from "../../../utils/expense";
import dayjs, { Dayjs } from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { mapDataByDate } from "@/utils/dayjs";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export interface DayListContainerProps {
  expenses: Array<Expense | PendingExpense>;
  disableGestures?: boolean;
}

const formatDay = (date: Dayjs) => {
  if (date.isToday()) return "Today";
  if (date.isYesterday()) return "Yesterday";

  return date.format("ddd, D MMM").toUpperCase();
  //
};

export default function ListExpensesByDay(props: DayListContainerProps) {
  const sortedList = useMemo(() => {
    const listByDayMap = mapDataByDate<Expense | PendingExpense>("day")(
      props.expenses
    );

    return Object.entries(listByDayMap)
      .map((entry) => ({
        day: dayjs(entry[0]),
        expenses: sortExpenses(entry[1]),
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
          <ExpensesList
            expenses={record.expenses}
            disableGestures={props.disableGestures}
          />
        </ListContainer>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    gap: 10,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  total: {},
});
