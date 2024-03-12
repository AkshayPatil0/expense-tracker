import { IconButton } from "@/components/IconButton";
import { Icon, TextInput, View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

interface SearchBarProps {
  search: string;
  onChange: (val: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <View style={styles.root}>
      <Icon name="magnifying-glass" style={styles.searchIcon} size={16} />
      <TextInput
        style={styles.input}
        value={props.search}
        onChangeText={props.onChange}
      />
      <IconButton
        padding={0}
        background={"none"}
        icon="circle-xmark"
        style={styles.cancelIcon}
        size={16}
        onPress={() => props.onChange("")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 20,
    zIndex: 12,
  },
  searchIcon: {
    position: "absolute",
    padding: 20,
    top: 8,
    left: 10,
    zIndex: 16,
  },
  cancelIcon: {
    position: "absolute",
    padding: 20,
    top: 8,
    right: 10,
  },
  input: {
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 4,
    height: 38,
  },
});
