import { LegacyRef, forwardRef, useImperativeHandle, useState } from "react";
import { Text, View } from "react-native";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import EmojiKeyboard from "./EmojiKeyboard";

export interface EmojiInputProps {
  value: string;
  onSelect: (emoji: string) => void;
}

export interface EmojiInputRef {
  focus: () => void;
}

function EmojiInput(props: EmojiInputProps, ref: React.Ref<EmojiInputRef>) {
  const [openKeyboard, setOpenKeyboard] = useState(false);

  useImperativeHandle(ref, () => ({
    focus() {
      setOpenKeyboard(true);
    },
  }));

  return (
    <GestureHandlerRootView>
      <TouchableOpacity onPress={() => setOpenKeyboard(true)}>
        <Text>{props.value}</Text>
      </TouchableOpacity>
      <EmojiKeyboard
        open={openKeyboard}
        onClose={() => setOpenKeyboard(false)}
        onSelect={props.onSelect}
      />
    </GestureHandlerRootView>
  );
}

export default forwardRef(EmojiInput);
