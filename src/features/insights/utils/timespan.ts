import {
  getDaysInMonth,
  getListOfMonths,
  getListOfWeekdays,
} from "@/utils/dayjs";
import { TIME_SPAN, TimeSpan } from "../store/insights-store";
import dayjs from "dayjs";

export const getLabelsByTimeSpan = (
  params: { ts: "week" | "year" } | { ts: "month"; month?: number }
) => {
  switch (params.ts) {
    case "week":
      return getListOfWeekdays();

    case "month":
      if (!params.month) throw new Error("Month is not provided");
      return Array(getDaysInMonth(params.month))
        .fill(0)
        .map<string>((_d, i) => (i + 1).toString());

    case "year":
      return getListOfMonths();

    default:
      return [];
  }
};

export const getGraphTitleByTimeSpan = (
  timeSpan: TimeSpan,
  reference: Date
): string => {
  switch (timeSpan) {
    case TIME_SPAN.week:
      const startDate = dayjs(reference).startOf("week").format("D MMM");
      const endDate = dayjs(reference).endOf("week").format("D MMM");
      return `${startDate} - ${endDate} ${dayjs(reference).format("YYYY")}`;

    case TIME_SPAN.month:
      return dayjs(reference).format("MMM YYYY");

    case TIME_SPAN.year:
      return dayjs(reference).format("YYYY");

    default:
      throw new Error("Invalid parameters");
  }
};
