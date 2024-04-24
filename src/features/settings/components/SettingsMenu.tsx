import { View } from "@/theme/components/Themed";
import SettingsMenuItem from "./SettingsMenuItem";
import { StyleSheet } from "react-native";
import { MenuItem } from "../constants/menu";

interface SettingsMenuProps {
  items: MenuItem[];
}

export default function SettingsMenu(props: SettingsMenuProps) {
  return (
    <View style={styles.root} backgroundDef="background3">
      {props.items.map((item) => (
        <SettingsMenuItem item={item} key={item.id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
