import { useEffect } from "react";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Canvas, Circle, useCanvasRef } from "@shopify/react-native-skia";

export default function LoadingIcon({
  loading,
  icon,
}: {
  loading: boolean;
  icon: string;
}) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 500 }), -1);
  }, []);

  const ref = useCanvasRef();

  return (
    <Canvas style={{ height: 300, backgroundColor: "white" }} ref={ref}>
      <Circle r={128} cx={128} cy={128} color="red" />
    </Canvas>
  );
}
