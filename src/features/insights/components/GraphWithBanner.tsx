import { useMemo, useRef, useState } from "react";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { Icon, Text, View } from "@/theme/components/Themed";
import { TIME_SPAN, useInsightsStore } from "../store/insights-store";
import { useReferences } from "../hooks/useTimeSpan";
import { useGraphPoints } from "../hooks/useGraphPoints";
import Banner from "./Banner";
import { LineGraph } from "@/components/lineGraph";
import {
  getGraphTitleByTimeSpan,
  getLabelsByTimeSpan,
} from "../utils/timespan";

import { DataPoint } from "@/components/lineGraph/useGraphData";
import { GraphProvider } from "@/components/lineGraph/graphContext";
import { LayoutChangeEvent } from "react-native";

const getAverage = (graphData: DataPoint[]) =>
  graphData.length
    ? graphData.map((pt) => pt.value).reduce((sum, val) => sum + val, 0) /
      graphData.length
    : 0;

const getAveragePercentage = (prevAverage: number, average: number) =>
  prevAverage && average
    ? Math.round(((prevAverage - average) / prevAverage) * 100)
    : 0;

interface GraphWithBannerProps {}

export function GraphWithBanner(props: GraphWithBannerProps) {
  const { timeSpan, reference, setReference } = useInsightsStore();
  const { nextReference, prevReference } = useReferences(timeSpan, reference);

  const [swiping, setSwiping] = useState(false);
  const graphData = useGraphPoints(timeSpan, reference);
  const prevGraphData = useGraphPoints<typeof prevReference>(
    timeSpan,
    prevReference
  );

  const graphLabels = useMemo(
    () => getLabelsByTimeSpan({ ts: timeSpan, month: 3 }), // Todo
    [timeSpan]
  );

  const bannerTitle = useMemo(
    () => getGraphTitleByTimeSpan(timeSpan, reference),
    [timeSpan, reference]
  );

  const prevBannerTitle = useMemo(() => {
    return prevReference && getGraphTitleByTimeSpan(timeSpan, prevReference);
  }, [timeSpan, reference]);

  const nextBannerTitle = useMemo(() => {
    return nextReference && getGraphTitleByTimeSpan(timeSpan, nextReference);
  }, [timeSpan, reference]);

  const average = useMemo(() => getAverage(graphData), [graphData]);
  const prevAverage = useMemo(
    () => (prevGraphData ? getAverage(prevGraphData) : 0),
    [graphData]
  );

  const frequency = useMemo(
    () => (timeSpan === TIME_SPAN.year ? "month" : "day"),
    [timeSpan]
  );
  const swipeableRef = useRef<Swipeable>(null);

  const onOpen = (dir: "left" | "right") => {
    if (dir === "left") {
      prevReference && setReference(prevReference);
    }
    if (dir === "right") {
      nextReference && setReference(nextReference);
    }
    swipeableRef.current?.close();
  };
  const [graphHeight, setGraphHeight] = useState(0);
  const [graphWidth, setGraphWidth] = useState(0);

  const onGraphLayout = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout;
    setGraphHeight(height * 0.8);
    setGraphWidth(width * 0.8);
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef}
        renderLeftActions={() => (
          <SwipeAction
            noData={!prevBannerTitle}
            text={prevBannerTitle}
            dir="left"
            swiping={swiping}
          />
        )}
        renderRightActions={() => (
          <SwipeAction
            noData={!nextBannerTitle}
            text={nextBannerTitle}
            dir="right"
            swiping={swiping}
          />
        )}
        overshootLeft={false}
        overshootRight={false}
        leftThreshold={150}
        rightThreshold={150}
        onSwipeableOpen={onOpen}
        onBegan={() => setSwiping(true)}
        onEnded={() => setSwiping(false)}
      >
        <View style={{ height: "100%" }}>
          <Banner
            title={bannerTitle}
            amount={Math.round(average)}
            frequency={`spent / ${frequency}`}
            percentage={getAveragePercentage(prevAverage, average)}
            timeSpan={timeSpan}
          />
          <View style={{ flex: 1 }} onLayout={onGraphLayout}>
            <GraphProvider height={graphHeight} width={graphWidth}>
              <LineGraph data={graphData} labels={graphLabels} />
            </GraphProvider>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

function SwipeAction({
  text,
  dir,
  noData,
  swiping,
}: {
  dir: "left" | "right";
  swiping: boolean;
  text?: string;
  noData?: boolean;
}) {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        gap: 10,
      }}
    >
      {noData ? (
        <>
          <Text style={{ fontWeight: "700" }} colorDef={"disabledText"}>
            No data available
          </Text>
          <Icon name="face-frown" size={24} />
        </>
      ) : (
        <>
          <Text style={{ fontWeight: "700" }} colorDef={"disabledText"}>
            {text}
          </Text>
          <Icon name={`circle-${dir}`} size={24} />
        </>
      )}
    </View>
  );
}
