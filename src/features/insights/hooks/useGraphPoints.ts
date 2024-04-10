import { Expense, PendingExpense } from "@/store/expenses";
import { useMemo } from "react";
import { TIME_SPAN, TimeSpan } from "../store/insights-store";
import { getDateRangeIn, mapDataByDate } from "@/utils/dayjs";
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
    if (!reference || !expenses) return undefined as R;
    const dates = getDateRangeIn(timeSpan)(
      reference,
      timeSpan === TIME_SPAN.year ? "month" : "day"
    );
    const datesToPointsMap = mapDataByDate<Expense | PendingExpense>(
      TimeSpanToTimeUnitMap[timeSpan]
    )(expenses);
    return dates.map<DataPoint>((date) => ({
      date: date.toDate(),
      value: countTotalAmount(datesToPointsMap[date.toISOString()] || []),
    })) as R;
  }, [expenses, timeSpan]);
};
