import {
  ColorDefinition,
  Icon,
  IconProps,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "@/theme/components/Themed";
import { StyleSheet } from "react-native";
import { Badge } from "./Badge";

export type IconButtonProps = {
  icon: string;
  size: number;
  onPress: TouchableOpacityProps["onPress"];
  badge?: number;
  disabled?: boolean;
  padding?: number;
  border?: number;
  color?: ColorDefinition;
  background?: ColorDefinition;
  borderColor?: ColorDefinition;
  style?: TouchableOpacityProps["style"];
  containerProps?: TouchableOpacityProps;
  iconProps?: IconProps;
};

const formatBadge = (badge: number) => {
  if (badge > 9) return "9+";
  return badge.toFixed(0).toString();
};
export function IconButton(props: IconButtonProps) {
  return (
    <TouchableOpacity
      backgroundDef={props.background}
      borderColorDef={props.borderColor}
      onPress={props.onPress}
      {...props.containerProps}
      style={[
        {
          padding:
            props.padding !== undefined ? props.padding : props.size / 2 - 2,
          borderRadius:
            props.padding !== undefined ? props.padding : props.size / 4 - 1,
          borderWidth: props.border !== undefined ? props.border : 0,
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
      disabled={props.disabled}
    >
      <Icon
        colorDef={
          props.disabled ? "disabledText" : props.color ? props.color : "tint"
        }
        style={[props.iconProps?.style, styles.icon]}
        name={props.icon}
        size={props.size}
        {...props.iconProps}
      />
      {!!props.badge && (
        <Badge badge={props.badge} size={props.size} top={4} right={4} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    aspectRatio: 1,
    textAlign: "center",
    padding: 2,
  },
});
