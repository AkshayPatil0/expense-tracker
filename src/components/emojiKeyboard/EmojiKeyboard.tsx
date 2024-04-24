import { View as ThemedView } from "@/theme/components/Themed";
import { useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { EMOJI_CATEGORIES } from "./emoji-data";
import { IconButton } from "../IconButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "../layout/Modal";
import EmojiListByCategory from "./EmojiListByCategory";
import EmojiCategorySelector from "./EmojiCategorySelector";

export interface EmojiKeyboardProps {
  open: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
}

export default function EmojiKeyboard(props: EmojiKeyboardProps) {
  const [categoryI, setCategoryI] = useState(0);

  const safeAreaInsets = useSafeAreaInsets();

  const categoryListRef = useRef<FlatList<(typeof EMOJI_CATEGORIES)[0]>>(null);

  const selectCategory = (i: number) => {
    if (i < 0 || i >= EMOJI_CATEGORIES.length) return;
    setCategoryI(i);
  };

  const onScrollCategory =
    (index: number) => (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { width } = e.nativeEvent.contentSize;
      const { width: layoutWidth } = e.nativeEvent.layoutMeasurement;
      const { x } = e.nativeEvent.contentOffset;
      const threshold = 50;
      if (x < 0) {
        const diff = Math.abs(x);
        if (diff > threshold) selectCategory(index - 1);
      }

      if (x + layoutWidth > width) {
        const diff = x + layoutWidth - width;
        if (diff > threshold) selectCategory(index + 1);
      }
    };

  useEffect(() => {
    categoryListRef.current?.scrollToIndex({
      index: categoryI,
      animated: true,
    });
  }, [categoryI]);
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ThemedView
        style={[
          styles.root,
          {
            paddingBottom: safeAreaInsets.bottom,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ref={categoryListRef}
            data={EMOJI_CATEGORIES}
            horizontal
            scrollEnabled={false}
            initialNumToRender={2}
            maxToRenderPerBatch={1}
            renderItem={(categoryItem) => (
              <EmojiListByCategory
                item={categoryItem.item}
                onScroll={onScrollCategory(categoryItem.index)}
                onEmojiSelect={props.onSelect}
              />
            )}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 100));
              wait.then(() => {
                categoryListRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true,
                });
              });
            }}
          />
        </View>
        <EmojiCategorySelector
          selectedCategoryIndex={categoryI}
          selectCategory={setCategoryI}
        />
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 300,
    paddingTop: 8,
  },
});
