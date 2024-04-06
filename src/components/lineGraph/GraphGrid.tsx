import { useColors } from "@/theme/hooks/useColors";
import { Line, vec } from "@shopify/react-native-skia";
import { GRAPH_HEIGHT, GRAPH_WIDTH } from "./constants";

export interface GraphGridProps {
  xLines: number;
}

export default function GraphGrid(props: GraphGridProps) {
  const colors = useColors();

  const xSpan = GRAPH_WIDTH / props.xLines;

  const getLineX = (i: number) => xSpan * i + xSpan / 2;

  return Array(props.xLines)
    .fill(0)
    .map((_d, i) => (
      <Line
        key={i}
        p1={vec(getLineX(i), 0)}
        p2={vec(getLineX(i), GRAPH_HEIGHT)}
        color={colors.background2}
        style="stroke"
        strokeWidth={1}
      />
    ));
}
