import { StyleSheet } from "react-native";
import { TopBar } from "@/components/TopBar";
import { IconButton } from "@/components/IconButton";
import { View } from "@/theme/components/Themed";

export interface TopBarProps {
  disabled?: boolean;
}

export function FilterBar(props: TopBarProps) {
  return (
    <TopBar>
      <View style={styles.root}>
        <IconButton
          style={styles.button}
          padding={12}
          icon="filter"
          size={24}
          onPress={() => {}}
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
