import { getCurrent, isDateInBetween, setCurrent } from "@/utils/dayjs";
import { useCallback } from "react";
import { TimeSpan, useInsightsStore } from "../store/insights-store";

export const useReferencesInBetween =
  (minDate: Date, maxDate: Date) => (timeSpan: TimeSpan, reference: Date) => {
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
