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

import LoadingIcon from "@/components/LodingIcon";
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
export function GraphWithBanner() {
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
        <View>
          <Banner
            title={bannerTitle}
            amount={Math.round(average)}
            frequency={`spend per ${frequency}`} // Todo
            percentage={getAveragePercentage(prevAverage, average)} // Todo
            timeSpan={timeSpan}
          />
          <LineGraph data={graphData} labels={graphLabels} />
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
