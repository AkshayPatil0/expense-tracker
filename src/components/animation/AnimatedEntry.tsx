import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ViewProps } from "@/theme/components/Themed";

interface AnimatedEntryProps {
  dependencies?: unknown[];
}

export default function AnimatedEntry(props: ViewProps & AnimatedEntryProps) {
  const { children, style, ...otherProps } = props;
  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = 0;
    opacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
    });
  }, [JSON.stringify(props.dependencies)]);

  return (
    <Animated.View style={[animatedStyles, style]} {...otherProps}>
      {children}
    </Animated.View>
  );
}
