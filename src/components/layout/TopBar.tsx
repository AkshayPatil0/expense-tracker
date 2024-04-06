import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ReactElement, useState } from "react";

import { ColorDefinition, View } from "@/theme/components/Themed";

export interface TopBarProps {
  children: ReactElement | ReactElement[];
  useSafeArea?: boolean;
}

export function TopBar(props: TopBarProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const [childrenHeight, setChildrenHeight] = useState(0);
  return (
    <>
      <View style={{ height: childrenHeight }} />
      <View style={styles.root}>
        {props.useSafeArea && (
          <View style={[{ height: safeAreaInsets.top }]}></View>
        )}
        <View onLayout={(e) => setChildrenHeight(e.nativeEvent.layout.height)}>
          {props.children}
        </View>
      </View>
    </>
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
