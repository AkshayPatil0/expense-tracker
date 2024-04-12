import { useMemo } from "react";
import { TIME_SPAN, useInsightsStore } from "../store/insights-store";
import { useReferences } from "../hooks/useTimeSpan";
import { useGraphPoints } from "../hooks/useGraphPoints";
import Banner from "./Banner";
import { getGraphTitleByTimeSpan } from "../utils/timespan";
import { DataPoint } from "@/components/lineGraph/useGraphData";

const getAverage = (graphData: DataPoint[]) =>
  graphData.length
    ? graphData.map((pt) => pt.value).reduce((sum, val) => sum + val, 0) /
      graphData.length
    : 0;

const getAveragePercentage = (prevAverage: number, average: number) =>
  prevAverage && average
    ? Math.round(((prevAverage - average) / prevAverage) * 100)
    : 0;

interface GraphBannerProps {}

export function GraphBanner(props: GraphBannerProps) {
  const { timeSpan, reference } = useInsightsStore();
  const { prevReference } = useReferences(timeSpan, reference);

  const graphData = useGraphPoints(timeSpan, reference);
  const prevGraphData = useGraphPoints<typeof prevReference>(
    timeSpan,
    prevReference
  );

  const bannerTitle = useMemo(
    () => getGraphTitleByTimeSpan(timeSpan, reference),
    [timeSpan, reference]
  );

  const average = useMemo(() => getAverage(graphData), [graphData]);
  const prevAverage = useMemo(
    () => (prevGraphData ? getAverage(prevGraphData) : 0),
    [graphData]
  );

  const frequency = useMemo(
    () => (timeSpan === TIME_SPAN.year ? "month" : "day"),
    [timeSpan]
  );

  return (
    <Banner
      title={bannerTitle}
      amount={Math.round(average)}
      frequency={`spent / ${frequency}`}
      percentage={getAveragePercentage(prevAverage, average)}
      timeSpan={timeSpan}
    />
  );
}
