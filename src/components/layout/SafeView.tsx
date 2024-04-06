import { View, ViewProps } from "@/theme/components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const safeAreaInsets = useSafeAreaInsets();
  return (
    <View style={[{ paddingTop: safeAreaInsets.top }, style]} {...otherProps} />
  );
}
