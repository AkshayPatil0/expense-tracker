import { IconButton } from "@/components/IconButton";
import { Icon, Text, View } from "@/theme/components/Themed";
import { MenuItem } from "../constants/menu";
import { StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { MenuOptionItem } from "../constants/options";

interface MenuOptionsSelectItemProps {
  option: MenuOptionItem;
}

export default function MenuOptionsSelectItem(
  props: MenuOptionsSelectItemProps
) {
  return (
    <GestureHandlerRootView>
      <TouchableOpacity style={styles.root}>
        <Icon
          name={props.option.icon}
          size={18}
          onPress={() => {}}
          style={styles.icon}
          colorDef="tint"
        />
        <Text style={styles.label}>{props.option.label}</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  icon: {
    borderRadius: 5,
    padding: 4,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
});
