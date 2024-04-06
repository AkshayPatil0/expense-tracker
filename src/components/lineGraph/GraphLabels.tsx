import { Text, View } from "@/theme/components/Themed";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { GRAPH_WIDTH } from "./constants";

const MAX_LABELS = 6;

export interface GraphLabelsProps {
  labels: readonly string[];
}

export default function GraphLabels(props: GraphLabelsProps) {
  const xSpan = GRAPH_WIDTH / props.labels.length;

  const range = Math.round((props.labels.length - 1) / MAX_LABELS);

  const midLabelIndexes = Array(MAX_LABELS)
    .fill(0)
    .map((_d, i) => Math.round((i + 1) * range));

  return (
    <View
      style={[
        styles.root,
        {
          width: GRAPH_WIDTH,
        },
      ]}
    >
      <GraphLabel label={props.labels[0]} minWidth={xSpan} />
      {midLabelIndexes.map((i) => (
        <GraphLabel
          key={i}
          label={props.labels[i]}
          minWidth={xSpan}
          style={{ position: "absolute", top: 8, left: i * xSpan }}
        />
      ))}
    </View>
  );
}

const GraphLabel = ({
  label,
  minWidth,
  style,
}: {
  label: string;
  minWidth: number;
  style?: StyleProp<TextStyle>;
}) => {
  return (
    <Text
      style={[
        styles.label,
        {
          minWidth,
        },
        style,
      ]}
      colorDef={"disabledText"}
    >
      {label}
    </Text>
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
