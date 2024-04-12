import { PropsWithChildren, useMemo, useRef, useState } from "react";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { Icon, Text, View } from "@/theme/components/Themed";
import { useInsightsStore } from "../store/insights-store";
import { useReferences } from "../hooks/useTimeSpan";
import { getGraphTitleByTimeSpan } from "../utils/timespan";

interface SwipeWrapperProps {}

export function SwipeWrapper(props: PropsWithChildren<SwipeWrapperProps>) {
  const { timeSpan, reference, setReference } = useInsightsStore();
  const { nextReference, prevReference } = useReferences(timeSpan, reference);

  const [swiping, setSwiping] = useState(false);

  const prevBannerTitle = useMemo(() => {
    return prevReference && getGraphTitleByTimeSpan(timeSpan, prevReference);
  }, [timeSpan, reference]);

  const nextBannerTitle = useMemo(() => {
    return nextReference && getGraphTitleByTimeSpan(timeSpan, nextReference);
  }, [timeSpan, reference]);

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
        {props.children}
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
