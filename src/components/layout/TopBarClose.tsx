import { StyleSheet, View } from "react-native";
import { useColors } from "@/theme/hooks/useColors";
import { IconButton, IconButtonProps } from "../IconButton";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TopBar } from "./TopBar";

export interface TopBarProps {
  icon?: string;
  iconSize?: number;
  disabled?: boolean;
  onClose: IconButtonProps["onPress"];
}

export function TopBarClose(props: TopBarProps) {
  return (
    <TopBar useSafeArea>
      <View style={styles.root}>
        <IconButton
          style={styles.button}
          padding={12}
          icon={props.icon ? props.icon : "xmark"}
          size={props.iconSize ? props.iconSize : 24}
          onPress={props.onClose}
          disabled={props.disabled}
        />
      </View>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
