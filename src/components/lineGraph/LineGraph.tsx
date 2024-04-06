import { View } from "@/theme/components/Themed";
import { useColors } from "@/theme/hooks/useColors";
import { StyleSheet } from "react-native";
import { DataPoint, useGraphData } from "./useGraphData";
import { Canvas, Path } from "@shopify/react-native-skia";
import { GRAPH_HEIGHT, GRAPH_WIDTH } from "./constants";
import GraphLabels from "./GraphLabels";
import GraphGrid from "./GraphGrid";

export interface LineGraphProps {
  data: DataPoint[];
  labels: string[];
}

export default function LineGraph(props: LineGraphProps) {
  const colors = useColors();
  const graphData = useGraphData(props.data, GRAPH_HEIGHT, GRAPH_WIDTH);

  const xSpan = GRAPH_WIDTH / props.labels.length;

  const getLineX = (i: number) => xSpan * i + xSpan / 2;

  return (
    <View style={styles.root}>
      <Canvas
        style={{
          height: GRAPH_HEIGHT,
          width: GRAPH_WIDTH,
        }}
      >
        <GraphGrid xLines={props.labels.length} />
        {graphData.curve ? (
          <Path
            style="stroke"
            path={graphData.curve}
            strokeWidth={4}
            color={colors.tint}
          />
        ) : null}
      </Canvas>
      <GraphLabels labels={props.labels} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graph: {
    width: "100%",
    height: "100%",
  },
});
