import {
  ColorDefinition,
  Icon,
  IconProps,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  titleProps?: TextProps;
};
export type IconButtonProps = {
  icon: string;
  size: number;
  onPress: TouchableOpacityProps["onPress"];
  padding?: number;
  border?: number;
  color?: ColorDefinition;
  background?: ColorDefinition;
  borderColor?: ColorDefinition;
  style?: TouchableOpacityProps["style"];
  containerProps?: TouchableOpacityProps;
  iconProps?: IconProps;
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
          padding: props.padding ? props.padding : props.size / 2,
          borderRadius: props.padding ? props.padding / 2 : props.size / 4,
          borderWidth: props.border ? props.border : 0,
          aspectRatio: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        props.style,
      ]}
    >
      <Icon
        colorDef={props.color ? props.color : "tint"}
        style={props.iconProps?.style}
        name={props.icon}
        size={props.size}
        {...props.iconProps}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
