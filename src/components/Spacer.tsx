import { View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

export interface SpacerProps {
  space: number;
}

export default function Spacer(props: SpacerProps) {
  return <View style={[style.root, { height: props.space }]}></View>;
}

export const style = StyleSheet.create({
  root: {
    width: "100%",
  },
});
