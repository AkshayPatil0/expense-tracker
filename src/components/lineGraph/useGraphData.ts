import { SkPath, Skia, useClock } from "@shopify/react-native-skia";
import { curveBasis, line, scaleLinear, scaleTime } from "d3";
import { useMemo } from "react";
import dayjs from "dayjs";
import MinMax from "dayjs/plugin/minMax";
import { sortByDateCompare } from "@/utils/dayjs";
import { useDerivedValue, withTiming } from "react-native-reanimated";

dayjs.extend(MinMax);

export type DataPoint = {
  date: Date;
  value: number;
};

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}

export const useGraphData = (
  data: DataPoint[],
  graphHeight: number,
  graphWidth: number
) => {
  const { minValue, maxValue, minDate, maxDate } = useMemo(() => {
    const minValue = Math.min(...data.map((val) => val.value));
    const maxValue = Math.max(...data.map((val) => val.value));
    const minDate = dayjs.min(data.map((d) => dayjs(d.date))) ?? dayjs();
    const maxDate = dayjs.max(data.map((d) => dayjs(d.date))) ?? dayjs();
    return { minValue, maxValue, minDate, maxDate };
  }, [data]);

  const y = useMemo(
    () =>
      scaleLinear()
        .domain([0, maxValue])
        .range([graphHeight - 10, 10]),
    [maxValue, graphHeight]
  );

  const x = useMemo(
    () =>
      scaleTime()
        .domain([minDate.toDate(), maxDate.toDate()])
        .range([2, graphWidth - 2]),
    [minDate, maxDate, graphWidth]
  );

  const curve = useMemo(() => {
    const curvedLine =
      line<DataPoint>()
        .x((d) => x(d.date))
        .y((d) => y(d.value))
        .curve(curveBasis)(data.sort(sortByDateCompare)) ?? "";

    const skPath = Skia.Path.MakeFromSVGString(curvedLine);

    if (!skPath) throw new Error("Invalid path");
    return skPath;
  }, [data, x, y]);

  const initialCurve = useMemo(() => {
    const curvedLine =
      line<DataPoint>()
        .x((d) => x(d.date))
        .y((d) => y(0))
        .curve(curveBasis)(data.sort(sortByDateCompare)) ?? "";

    const skPath = Skia.Path.MakeFromSVGString(curvedLine);

    if (!skPath) throw new Error("Invalid path");
    return skPath;
  }, [data, x, y]);

  return { minValue, maxValue, curve, initialCurve };
};
