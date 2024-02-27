import { ScrollView, ScrollViewProps } from "@/theme/components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeScrollView(props: ScrollViewProps) {
  const { contentContainerStyle, ...otherProps } = props;
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <ScrollView
      contentContainerStyle={[
        { paddingTop: safeAreaInsets.top },
        contentContainerStyle,
      ]}
      {...otherProps}
    />
  );
}
