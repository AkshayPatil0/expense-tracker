import { ColorDefinition, View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

export interface SeparatorProps {
  color?: ColorDefinition;
}
export default function Separator(props: SeparatorProps) {
  const { color } = props;
  return (
    <View
      backgroundDef={color ? color : "disabledText"}
      style={style.root}
    ></View>
  );
}

export const style = StyleSheet.create({
  root: {
    width: "100%",
    height: 1,
  },
});
