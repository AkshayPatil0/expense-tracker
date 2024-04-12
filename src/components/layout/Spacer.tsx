import { View } from "@/theme/components/Themed";
import { DimensionValue, StyleSheet } from "react-native";

export interface SpacerProps {
  space: DimensionValue;
}

export default function Spacer(props: SpacerProps) {
  return <View style={[style.root, { height: props.space }]}></View>;
}

export const style = StyleSheet.create({
  root: {
    width: "100%",
  },
});
