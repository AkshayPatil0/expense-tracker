import { TopBar } from "@/components/layout/TopBar";
import Header from "./components/Header";
import Banner from "./components/Banner";
import SafeScrollView from "@/components/layout/SafeScrollView";
import { LineGraph } from "../../components/lineGraph";
import { TimeSpan, useInsightsStore } from "./store/insights-store";
import { useGraphPoints } from "./hooks/useGraphPoints";
import { useEffect, useMemo, useRef } from "react";
import { getLabelByTimeSpan } from "@/utils/dayjs";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useReferencesInBetween } from "./hooks/useTimeSpan";
import { DataPoint } from "@/components/lineGraph/useGraphData";
import { View } from "@/theme/components/Themed";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function Insights() {
  return (
    <>
      <TopBar useSafeArea>
        <Header />
      </TopBar>
      <GestureHandlerRootView>
        <SafeScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          <GraphWithBanner />
        </SafeScrollView>
      </GestureHandlerRootView>
    </>
  );
}

function GraphWithBanner() {
  const { timeSpan, reference, setReference } = useInsightsStore();
  const { nextReference, prevReference } = useReferencesInBetween(
    new Date(2000, 1, 1),
    new Date(2100, 1, 1)
  )(timeSpan, reference);

  const nextReferenceS = nextReference?.toString();
  const graphData = useGraphPoints(timeSpan, reference);

  const graphLabels = useMemo(
    () => getLabelByTimeSpan({ ts: timeSpan, month: 3 }),
    [timeSpan]
  );
  const translateX = useSharedValue(0);
  const lastTranslateX = useRef<number>();

  const onSuccess = () => {
    "worklet";
    // if (x > 90) {
    //   console.log({ prevReference });
    //   if (prevReference) setReference(prevReference);
    // } else if (x < -90) {
    //   console.log({ nextReference });
    //   if (nextReference) setReference(nextReference);
    // }
    setReference(new Date());
    console.log(nextReferenceS);
  };
  const panGesture = Gesture.Pan()
    .maxPointers(1)
    .onChange((e) => {
      const { changeX, velocityX } = e;
      const newTranslateX =
        translateX.value + changeX + 1 * Math.abs(velocityX / 1000);
      if (newTranslateX > 100) {
        // if (prevReference) setReference(prevReference);
        return;
      } else if (newTranslateX < -100) {
        // if (nextReference) setReference(nextReference);
        return;
      }
      translateX.value = newTranslateX;
      // translateX.value += changeX;
      // runOnJS(() => {
      //   // if (x > 90) {
      //   //   console.log({ prevReference });
      //   //   if (prevReference) setReference(prevReference);
      //   // } else if (x < -90) {
      //   //   console.log({ nextReference });
      //   //   if (nextReference) setReference(nextReference);
      //   // }
      //   console.log("hii");
      // })();
    })
    .onEnd((e) => {
      // runOnJS(() => {
      //   // if (x > 90) {
      //   //   console.log({ prevReference });
      //   //   if (prevReference) setReference(prevReference);
      //   // } else if (x < -90) {
      //   //   console.log({ nextReference });
      //   //   if (nextReference) setReference(nextReference);
      //   // }
      //   console.log("hii");
      // })();
      // translateX.value = withSpring(
      //   0,
      //   {
      //     duration: 1000,
      //     stiffness: 1000,
      //     dampingRatio: 0.6,
      //   },
      //   () => {
      //     runOnJS(onSuccess)();
      //   }
      // );
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));
  return (
    <>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyles}>
          <Banner
            title="2021"
            amount="1000"
            frequency="spend per day"
            percentage={-12}
          />
          <LineGraph data={graphData} labels={graphLabels} />
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({});
