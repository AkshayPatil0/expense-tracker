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
  const iconColor = props.color ? props.color : props.disabled ? "" : "tint";
  return (
    <TouchableOpacity
      backgroundDef={props.background}
      borderColorDef={props.borderColor}
      onPress={props.onPress}
      {...props.containerProps}
      style={[
        {
          padding: props.padding ? props.padding : props.size / 2,
          borderRadius: props.padding ? props.padding / 2 : props.size / 4,
          borderWidth: props.border ? props.border : 0,
          aspectRatio: 1,
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
        style={props.iconProps?.style}
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

const styles = StyleSheet.create({});
