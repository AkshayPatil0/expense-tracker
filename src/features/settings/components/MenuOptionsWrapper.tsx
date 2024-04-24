import { Text, View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";
import { IconButton } from "@/components/IconButton";
import { useSettingsStore } from "../store/settings-store";
import { PropsWithChildren } from "react";

interface MenuOptionsProps {
  menuLabel: string;
}

export default function MenuOptionsWrapper(
  props: PropsWithChildren<MenuOptionsProps>
) {
  const { setSelectedMenu } = useSettingsStore();
  return (
    <View>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={16}
          color="disabledText"
          onPress={() => setSelectedMenu("")}
        />
        <Text colorDef="disabledText" style={styles.label}>
          {props.menuLabel}
        </Text>
      </View>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
});
