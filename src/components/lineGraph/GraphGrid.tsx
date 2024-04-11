import { useColors } from "@/theme/hooks/useColors";
import { Line, vec } from "@shopify/react-native-skia";
import { GRAPH_HEIGHT, GRAPH_WIDTH } from "./constants";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

export interface GraphGridProps {
  xLabels: string[];
}

export default function GraphGrid(props: GraphGridProps) {
  const xSpan = GRAPH_WIDTH / (props.xLabels.length - 1);

  const colors = useColors();
  return (
    <>
      <AnimatedLine key={props.xLabels[0]} x={0} color={colors.background2} />
      {props.xLabels.slice(1, -1).map((label, i) => (
        <AnimatedLine
          key={label}
          x={xSpan * (i + 1)}
          color={colors.background2}
        />
      ))}
      <AnimatedLine
        key={props.xLabels.at(-1)}
        x={GRAPH_WIDTH}
        color={colors.background2}
      />
    </>
  );
}

function AnimatedLine({ x, color }: { x: number; color: string }) {
  const animatedY = useSharedValue(GRAPH_HEIGHT);

  const p1 = useDerivedValue(() => vec(x, animatedY.value));
  const p2 = useDerivedValue(() => vec(x, GRAPH_HEIGHT));

  useEffect(() => {
    animatedY.value = withTiming(0, { duration: 500 });
  }, [x]);

  return <Line p1={p1} p2={p2} color={color} style="stroke" strokeWidth={1} />;
}
