import { Expense, PendingExpense } from "@/store/expenses";
import { useMemo } from "react";
import { TIME_SPAN, TimeSpan, useInsightsStore } from "../store/insights-store";
import { mapDataByDate } from "@/utils/dayjs";
import { useExpensesByTimeSpan } from "./useExpensesByTimeSpan";
import { DataPoint } from "@/components/lineGraph/useGraphData";
import { countTotalAmount } from "@/utils/expense";

const TimeSpanToTimeUnitMap = {
  [TIME_SPAN.week]: "day",
  [TIME_SPAN.month]: "date",
  [TIME_SPAN.year]: "month",
} as const;

export const useGraphPoints = <
  Ref extends Date | undefined,
  R = Ref extends undefined ? undefined : DataPoint[]
>(
  timeSpan: TimeSpan,
  reference?: Ref
): R => {
  const expenses = useExpensesByTimeSpan<Ref>(timeSpan, reference);

  return useMemo<R>(() => {
    if (!expenses) return undefined as R;
    return Object.entries(
      mapDataByDate<Expense | PendingExpense>(TimeSpanToTimeUnitMap[timeSpan])(
        expenses
      )
    ).map<DataPoint>((entry) => ({
      date: new Date(entry[0]),
      value: countTotalAmount(entry[1]),
    })) as R;
  }, [expenses, timeSpan]);
};
