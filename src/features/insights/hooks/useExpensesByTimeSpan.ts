import { Expense, PendingExpense, useExpenseStore } from "@/store/expenses";
import { useMemo } from "react";
import { TimeSpan, useInsightsStore } from "../store/insights-store";
import { isDateInCurrentUnit } from "@/utils/dayjs";

export const useExpensesByTimeSpan = <
  Ref extends Date | undefined,
  R = Ref extends undefined ? undefined : (Expense | PendingExpense)[]
>(
  timeSpan: TimeSpan,
  reference?: Ref
): R => {
  const { expenses } = useExpenseStore();

  return useMemo<R>(() => {
    if (typeof reference === "undefined") return undefined as R;

    return expenses.filter((expense) =>
      isDateInCurrentUnit(timeSpan, reference)(expense.date)
    ) as R;
  }, [expenses, timeSpan]);
};
