import { IconButton } from "@/components/IconButton";
import { Icon, Text, View } from "@/theme/components/Themed";
import { ReactElement } from "react";
import { Modal as DefaultModal, StyleSheet } from "react-native";

export interface FilterModalProps {
  visible: boolean;
  onClose: () => {};
  title?: string;
  children: ReactElement | ReactElement[];
}
export default function Modal(props: FilterModalProps) {
  return (
    <DefaultModal
      animationType="slide"
      transparent={true}
      visible={props.visible}
    >
      <View style={styles.root}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
          <IconButton icon="x-mark" onPress={props.onClose} size={20} />
        </View>
        {props.children}
      </View>
    </DefaultModal>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    paddingHorizontal: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {},
});
