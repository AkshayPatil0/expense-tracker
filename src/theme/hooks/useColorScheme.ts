import {
  ColorSchemeName,
  useColorScheme as defaultUseColorScheme,
} from "react-native";

export const useColorScheme = (): "light" | "dark" => {
  const colorScheme = defaultUseColorScheme();

  // return colorScheme ?? "dark";
  return "dark";
};
