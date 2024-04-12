import { useMemo, useState } from "react";
import { View } from "@/theme/components/Themed";
import { useInsightsStore } from "../store/insights-store";
import { useGraphPoints } from "../hooks/useGraphPoints";
import { LineGraph } from "@/components/lineGraph";
import { getLabelsByTimeSpan } from "../utils/timespan";
import { GraphProvider } from "@/components/lineGraph/graphContext";
import { LayoutChangeEvent } from "react-native";
import { GraphBanner } from "./GraphBanner";
import { SwipeWrapper } from "./SwipeWrapper";

interface GraphWithBannerProps {}

export function GraphWithBanner(props: GraphWithBannerProps) {
  const { timeSpan, reference } = useInsightsStore();

  const graphData = useGraphPoints(timeSpan, reference);

  const graphLabels = useMemo(
    () => getLabelsByTimeSpan({ ts: timeSpan, month: 3 }), // Todo
    [timeSpan]
  );

  const [graphHeight, setGraphHeight] = useState(0);
  const [graphWidth, setGraphWidth] = useState(0);

  const onGraphLayout = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout;
    setGraphHeight(height * 0.8);
    setGraphWidth(width * 0.8);
  };

  return (
    <SwipeWrapper>
      <View style={{ height: "100%" }}>
        <GraphBanner />
        <View style={{ flex: 1 }} onLayout={onGraphLayout}>
          <GraphProvider height={graphHeight} width={graphWidth}>
            <LineGraph data={graphData} labels={graphLabels} />
          </GraphProvider>
        </View>
      </View>
    </SwipeWrapper>
  );
}
