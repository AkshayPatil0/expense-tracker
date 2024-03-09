import { Text, View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

export type BadgeProps = {
  badge: number;
  size: number;
  top: number;
  right: number;
};

const formatBadge = (badge: number) => {
  if (badge > 9) return "9+";
  return badge.toFixed(0).toString();
};

export function Badge(props: BadgeProps) {
  return (
    <View
      backgroundDef={"danger"}
      style={[
        styles.badgeContainer,
        {
          width: props.size * 0.8,
          height: props.size * 0.8,
          top: props.top,
          right: props.right,
        },
      ]}
    >
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[styles.badge, { fontSize: props.size / 2 }]}
      >
        {formatBadge(props.badge)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    borderRadius: 50,

    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    fontWeight: "600",
    padding: 2,
  },
});
