import { View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

export default function Separator() {
  return <View backgroundDef="disabledText" style={style.root}></View>;
}

export const style = StyleSheet.create({
  root: {
    width: "100%",
    height: 1,
  },
});
