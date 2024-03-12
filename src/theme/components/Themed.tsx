/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView as DefaultScrollView,
  TextInput as DefaultTextInput,
  Button as DefaultButton,
  TouchableOpacity as DefaultTouchableOpacity,
} from "react-native";

import Colors from "../constants/Colors";
import { useColorScheme } from "../hooks/useColorScheme";
import { FontAwesome6 } from "@expo/vector-icons";

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export type ColorDefinition =
  | "none"
  | ColorName
  | {
      light: string;
      dark: string;
    };

type ThemeProps = {
  colorDef?: ColorDefinition;
  backgroundDef?: ColorDefinition | "none";
  borderColorDef?: ColorDefinition;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type TextInputProps = ThemeProps & DefaultTextInput["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];
export type IconProps = ThemeProps & (typeof FontAwesome6)["props"];
export type TouchableOpacityProps = ThemeProps &
  DefaultTouchableOpacity["props"];

export function useThemeColor(colorName: ColorName, def?: ColorDefinition) {
  const theme = useColorScheme();

  if (!def) {
    return Colors[theme][colorName];
  }
  if (def === "none") return undefined;

  if (typeof def === "string") {
    return Colors[theme][def];
  }

  const colorFromProps = def[theme];
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, colorDef, ...otherProps } = props;
  const color = useThemeColor("text", colorDef);

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
export function TextInput(props: TextInputProps) {
  const { style, colorDef, backgroundDef, borderColorDef, ...otherProps } =
    props;
  const color = useThemeColor("text", colorDef);
  const backgroundColor = useThemeColor("background2", backgroundDef);
  const borderColor = useThemeColor("tint", borderColorDef);
  const placeholderTextColor = useThemeColor("disabledText");
  return (
    <DefaultTextInput
      style={[{ color, borderColor, backgroundColor }, style]}
      {...otherProps}
      placeholderTextColor={placeholderTextColor}
    />
  );
}

export function View(props: ViewProps) {
  const { style, backgroundDef, ...otherProps } = props;
  const backgroundColor =
    backgroundDef === "none"
      ? undefined
      : useThemeColor("background", backgroundDef);

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
export function ScrollView(props: ScrollViewProps) {
  const { style, backgroundDef, ...otherProps } = props;
  const backgroundColor =
    backgroundDef === "none"
      ? undefined
      : useThemeColor("background", backgroundDef);

  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function Icon(props: IconProps) {
  const { style, colorDef, ...otherProps } = props;
  const color = useThemeColor("iconDefault", colorDef);

  return <FontAwesome6 style={[{ color }, style]} {...otherProps} />;
}

export function TouchableOpacity(props: TouchableOpacityProps) {
  const { style, backgroundDef, borderColorDef, ...otherProps } = props;
  const backgroundColor =
    backgroundDef === "none"
      ? undefined
      : useThemeColor("background", backgroundDef);
  const borderColor = useThemeColor("tint", borderColorDef);
  return (
    <DefaultTouchableOpacity
      style={[{ backgroundColor, borderColor }, style]}
      {...otherProps}
    />
  );
}
