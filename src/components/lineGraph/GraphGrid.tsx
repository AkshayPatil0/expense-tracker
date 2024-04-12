import { useColors } from "@/theme/hooks/useColors";
import { Line, vec } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { GraphStore, useGraphStore } from "./graphContext";

export interface GraphGridProps {
  xLabels: string[];
  graphStore: GraphStore;
}

export default function GraphGrid(props: GraphGridProps) {
  const xSpan = props.graphStore.width / (props.xLabels.length - 1);
  const colors = useColors();
  return (
    <>
      <AnimatedLine
        key={props.xLabels[0]}
        x={0}
        color={colors.background2}
        graphStore={props.graphStore}
      />
      {props.xLabels.slice(1, -1).map((label, i) => (
        <AnimatedLine
          key={label}
          x={xSpan * (i + 1)}
          color={colors.background2}
          graphStore={props.graphStore}
        />
      ))}
      <AnimatedLine
        key={props.xLabels.at(-1)}
        x={props.graphStore.width}
        color={colors.background2}
        graphStore={props.graphStore}
      />
    </>
  );
}

function AnimatedLine({
  x,
  color,
  graphStore,
}: {
  x: number;
  color: string;
  graphStore: GraphStore;
}) {
  const animatedY = useSharedValue(graphStore.height);

  const p1 = useDerivedValue(() => vec(x, animatedY.value));
  const p2 = useDerivedValue(() => vec(x, graphStore.height));

  useEffect(() => {
    animatedY.value = withTiming(0, { duration: 500 });
  }, [x]);

  return <Line p1={p1} p2={p2} color={color} style="stroke" strokeWidth={1} />;
}
