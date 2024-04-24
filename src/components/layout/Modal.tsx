import { PropsWithChildren } from "react";
import { Modal as RnModal, StyleSheet } from "react-native";
import {
  TouchableWithoutFeedback,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
  return (
    <GestureHandlerRootView>
      <RnModal
        transparent
        style={styles.modal}
        onDismiss={props.onClose}
        animationType="slide"
        visible={props.open}
        onRequestClose={props.onClose}
      >
        <TouchableWithoutFeedback
          containerStyle={{
            flex: 1,
          }}
          onPress={props.onClose}
        ></TouchableWithoutFeedback>
        {props.children}
      </RnModal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  modal: { justifyContent: "flex-end" },
});
