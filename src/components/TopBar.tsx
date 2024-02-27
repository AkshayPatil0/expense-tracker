import { StyleSheet, View } from "react-native";
import { useColors } from "@/theme/hooks/useColors";
import { IconButton, IconButtonProps } from "./IconButton";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface TopBarProps {
  icon?: string;
  iconSize?: number;
  onPress: IconButtonProps["onPress"];
}

export function TopBar(props: TopBarProps) {
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View style={[{ top: safeAreaInsets.top }, styles.root]}>
      <IconButton
        style={styles.button}
        padding={12}
        icon={props.icon ? props.icon : "xmark"}
        size={props.iconSize ? props.iconSize : 24}
        onPress={props.onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
