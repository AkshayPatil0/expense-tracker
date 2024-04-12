import { View } from "@/theme/components/Themed";
import { useColors } from "@/theme/hooks/useColors";
import { StyleSheet } from "react-native";
import { DataPoint, useGraphData } from "./useGraphData";
import { Canvas, Path, usePathInterpolation } from "@shopify/react-native-skia";
import GraphLabels from "./GraphLabels";
import GraphGrid from "./GraphGrid";
import { useEffect } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { useGraphStore } from "./graphContext";

export interface LineGraphProps {
  data: DataPoint[];
  labels: string[];
}

export default function LineGraph(props: LineGraphProps) {
  const colors = useColors();
  const graphStore = useGraphStore();
  const { curve, initialCurve } = useGraphData(
    props.data,
    graphStore.height,
    graphStore.width
  );

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 500 });
  }, [curve]);

  const path = usePathInterpolation(progress, [0, 1], [initialCurve, curve]);

  return (
    <View style={[styles.root, { height: graphStore.height }]}>
      <Canvas
        style={{
          height: graphStore.height,
          width: graphStore.width,
        }}
      >
        <GraphGrid xLabels={props.labels} graphStore={graphStore} />
        {curve ? (
          <Path
            style="stroke"
            path={path}
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
