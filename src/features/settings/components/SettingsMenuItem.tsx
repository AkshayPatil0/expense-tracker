import { IconButton } from "@/components/IconButton";
import { Icon, Text, View } from "@/theme/components/Themed";
import { MenuItem } from "../constants/menu";
import { StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useSettingsStore } from "../store/settings-store";

interface SettingsMenuItemProps {
  item: MenuItem;
}

export default function SettingsMenuItem(props: SettingsMenuItemProps) {
  const { setSelectedMenu } = useSettingsStore();
  return (
    <GestureHandlerRootView>
      <TouchableOpacity
        style={styles.root}
        onPress={() => setSelectedMenu(props.item.id)}
      >
        <IconButton
          icon={props.item.icon}
          size={16}
          onPress={() => {}}
          style={styles.icon}
          background="tint"
          color="background"
        />
        <Text style={styles.label}>{props.item.label}</Text>
        <Icon size={16} name="chevron-right" colorDef="disabledText" />
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  icon: {
    borderRadius: 5,
    padding: 8,
    aspectRatio: 1,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
});
