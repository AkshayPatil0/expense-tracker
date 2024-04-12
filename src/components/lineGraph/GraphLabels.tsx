import { View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useColors } from "@/theme/hooks/useColors";
import { useEffect } from "react";
import { useGraphStore } from "./graphContext";

const MAX_LABELS = 6;

export interface GraphLabelsProps {
  labels: readonly string[];
}

export default function GraphLabels(props: GraphLabelsProps) {
  const graphStore = useGraphStore();
  const xSpan = graphStore.width / (props.labels.length - 1);

  const range = Math.round((props.labels.length - 1) / MAX_LABELS);

  const midLabelIndexes = Array(MAX_LABELS)
    .fill(0)
    .map((_d, i) => Math.round((i + 1) * range));

  return (
    <View
      style={[
        styles.root,
        {
          width: graphStore.width + xSpan,
          height: 32,
        },
      ]}
    >
      <GraphLabel
        key={props.labels[0]}
        label={props.labels[0]}
        minWidth={xSpan}
        left={0}
      />
      {midLabelIndexes.map((i) => (
        <GraphLabel
          key={props.labels[i]}
          label={props.labels[i]}
          minWidth={xSpan}
          left={xSpan * i}
        />
      ))}
    </View>
  );
}

const GraphLabel = ({
  label,
  minWidth,
  left,
}: {
  label: string;
  minWidth: number;
  left?: number;
}) => {
  const colors = useColors();
  const animatedLeft = useSharedValue(5);
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedLeft.value }],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = 1;
    animatedLeft.value = withSpring(0);
  }, [left]);

  return (
    <Animated.Text
      style={[
        styles.label,
        {
          minWidth,
          color: colors.disabledText,
        },
        { position: "absolute", top: 8, left },
        animatedStyle,
      ]}
    >
      {label}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
  },
  label: {
    textAlign: "center",
    fontWeight: "600",
  },
});
