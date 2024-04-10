import { getCurrent, isDateInBetween, setCurrent } from "@/utils/dayjs";
import { useCallback, useMemo } from "react";
import { TimeSpan } from "../store/insights-store";
import { useExpenseStore } from "@/store/expenses";

export const useReferences = (timeSpan: TimeSpan, reference: Date) => {
  const { expenses } = useExpenseStore();
  const dates = useMemo(
    () => expenses.map((exp) => exp.date.getTime()),
    [expenses]
  );
  const minDate = useMemo(() => new Date(Math.min(...dates)), []);
  const maxDate = useMemo(() => new Date(Math.max(...dates)), []);
  const isValidReference = useCallback(isDateInBetween(minDate, maxDate), [
    minDate,
    maxDate,
  ]);

  const updateReference = (by: 1 | -1) => {
    const currentRefUnit = getCurrent(timeSpan)(reference);
    const newReference = setCurrent(timeSpan)(reference, currentRefUnit + by);
    if (isValidReference(newReference)) {
      return newReference;
    }
  };

  return {
    nextReference: updateReference(1),
    prevReference: updateReference(-1),
  };
};
