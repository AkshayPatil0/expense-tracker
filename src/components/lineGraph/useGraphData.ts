import { SkPath, Skia } from "@shopify/react-native-skia";
import { curveBasis, line, scaleLinear, scaleTime } from "d3";
import { useMemo } from "react";
import dayjs from "dayjs";
import MinMax from "dayjs/plugin/minMax";
import { sortByDateCompare } from "@/utils/dayjs";

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

const makeGraph = (
  data: DataPoint[],
  graphHeight: number,
  graphWidth: number
): GraphData => {
  const max = Math.max(...data.map((val) => val.value));
  const min = Math.min(...data.map((val) => val.value));
  const y = scaleLinear()
    .domain([0, max])
    .range([graphHeight - 10, 10]);

  const minDate = dayjs.min(data.map((d) => dayjs(d.date))) ?? dayjs();
  const maxDate = dayjs.max(data.map((d) => dayjs(d.date))) ?? dayjs();
  const x = scaleTime()
    .domain([minDate.toDate(), maxDate.toDate()])
    .range([2, graphWidth - 2]);

  const curvedLine =
    line<DataPoint>()
      .x((d) => x(d.date))
      .y((d) => y(d.value))
      .curve(curveBasis)(data.sort(sortByDateCompare)) ?? "";

  const skPath = Skia.Path.MakeFromSVGString(curvedLine);

  if (!skPath) throw new Error("Invalid path");
  return {
    max,
    min,
    curve: skPath,
  };
};

export const useGraphData = (
  data: DataPoint[],
  graphHeight: number,
  graphWidth: number
) => {
  return useMemo(
    () => makeGraph(data, graphHeight, graphWidth),
    [data, graphHeight, graphWidth]
  );
};
