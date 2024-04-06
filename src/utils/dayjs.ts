import dayjs from "dayjs";

import isBetween from "dayjs/plugin/isBetween";
import LocaleData from "dayjs/plugin/localeData";
import WeekOfYear from "dayjs/plugin/weekOfYear";

dayjs.extend(isBetween);
dayjs.extend(LocaleData);
dayjs.extend(WeekOfYear);

export const isDateInCurrentUnit =
  (unit: "day" | "week" | "month" | "year", ref?: Date) => (date: Date) => {
    const startDate = dayjs(ref).startOf(unit);
    const endDate = dayjs(ref).endOf(unit);

    return dayjs(date).isBetween(startDate, endDate);
  };

export const isDateInBetween =
  (startDate: Date, endDate: Date) => (date: Date) =>
    dayjs(date).isBetween(startDate, endDate);

export const sortByDateCompare = <T extends { date: Date }>(v1: T, v2: T) =>
  dayjs(v1.date).isAfter(dayjs(v2.date)) ? -1 : 1;

export const getCurrent =
  (unit: "day" | "week" | "month" | "year") => (date: Date) => {
    switch (unit) {
      case "week":
        return dayjs(date).week();

      default:
        return 0;
    }
  };

export const setCurrent =
  (unit: "day" | "week" | "month" | "year") => (date: Date, delta: number) => {
    switch (unit) {
      case "week":
        return dayjs(date).week(delta).toDate();

      default:
        return date;
    }
  };
export const mapDataByDate =
  <T extends { date: Date }>(unit: "day" | "date" | "month") =>
  (data: T[]) => {
    return data.reduce<Record<string, Array<T>>>((res, record) => {
      const day = dayjs(record.date).startOf(unit).toString();
      return {
        ...res,
        [day]: [...(res[day] || []), record],
      };
    }, {});
  };

export const getLabelByTimeSpan = (
  params: { ts: "week" | "year" } | { ts: "month"; month?: number }
) => {
  switch (params.ts) {
    case "week":
      return dayjs().localeData().weekdaysShort();

    case "month":
      return Array(dayjs(`2000-${params.month}-01`).daysInMonth())
        .fill(0)
        .map<string>((_d, i) => (i + 1).toString());

    case "year":
      return dayjs().localeData().monthsShort();

    default:
      return [];
  }
};
