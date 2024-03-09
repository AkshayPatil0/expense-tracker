import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReactElement } from "react";

import { ColorDefinition, View } from "@/theme/components/Themed";

export interface TopBarProps {
  children: ReactElement | ReactElement[];
}

export function TopBar(props: TopBarProps) {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <View style={[{ height: safeAreaInsets.top }]}></View>
      <View>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  statusBar: {},
});
