import { useState } from "react";
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
export default function EmojiInput(props: EmojiInputProps) {
  const [openKeyboard, setOpenKeyboard] = useState(false);

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
