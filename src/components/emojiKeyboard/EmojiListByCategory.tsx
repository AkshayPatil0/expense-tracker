import { Text } from "@/theme/components/Themed";
import {
  Dimensions,
  ScrollViewProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { EMOJI_CATEGORIES } from "./emoji-data";

export interface EmojiListByCategoryProps {
  item: (typeof EMOJI_CATEGORIES)[0];
  onScroll: ScrollViewProps["onScroll"];
  onEmojiSelect: (emoji: string) => void;
}

const windowDimensions = Dimensions.get("window");

export default function EmojiListByCategory(props: EmojiListByCategoryProps) {
  const [category, _icon, emojis] = props.item;
  const numColumns = Math.ceil(emojis.length / 5);
  return (
    <View style={{ width: windowDimensions.width }} key={category}>
      <Text
        colorDef={"disabledText"}
        style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          fontWeight: "600",
        }}
      >
        {category}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}
        onScroll={props.onScroll}
        scrollEventThrottle={128}
      >
        <FlatList
          data={emojis}
          renderItem={(item) => (
            <EmojiItem item={item.item} onSelect={props.onEmojiSelect} />
          )}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={{ marginHorizontal: "auto" }}
          contentContainerStyle={{
            justifyContent: "center",
          }}
        />
      </ScrollView>
    </View>
  );
}

function EmojiItem(props: {
  item: [string, string];
  onSelect: (emoji: string) => void;
}) {
  const [emoji, name] = props.item;
  return (
    <TouchableOpacity
      key={name}
      style={{
        paddingHorizontal: 6,
        paddingVertical: 5,
      }}
      onPress={() => props.onSelect(emoji)}
    >
      <Text style={{ fontSize: 24 }}>{emoji}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  root: {
    height: 300,
    paddingTop: 8,
  },
});
