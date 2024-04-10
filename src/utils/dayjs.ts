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

      case "month":
        return dayjs(date).month();

      case "year":
        return dayjs(date).year();
      default:
        throw new Error("Invalid parameters");
    }
  };

export const setCurrent =
  (unit: "day" | "week" | "month" | "year") => (date: Date, delta: number) => {
    switch (unit) {
      case "week":
        return dayjs(date).week(delta).toDate();
      case "month":
        return dayjs(date).month(delta).toDate();

      case "year":
        return dayjs(date).year(delta).toDate();
      default:
        throw new Error("Invalid parameters");
    }
  };

export const mapDataByDate =
  <T extends { date: Date }>(unit: "day" | "date" | "month") =>
  (data: T[]) => {
    return data.reduce<Record<string, Array<T>>>((res, record) => {
      const day = dayjs(record.date).startOf(unit).toISOString();
      return {
        ...res,
        [day]: [...(res[day] || []), record],
      };
    }, {});
  };

export const getListOfWeekdays = () => dayjs().localeData().weekdaysShort();
export const getListOfMonths = () => dayjs().localeData().monthsShort();
export const getDaysInMonth = (month: number) =>
  dayjs(`2000-${month}-01`).daysInMonth();

export const getDateRangeIn =
  (unit: "week" | "month" | "year") =>
  (reference: Date, diff: "day" | "month" = "day") => {
    const points = [];
    let currentDate = dayjs(reference).startOf(unit);
    const endDate = dayjs(reference).endOf(unit);

    while (currentDate.isBefore(endDate)) {
      points.push(currentDate);
      currentDate = currentDate.add(1, diff);
    }

    return points;
  };
