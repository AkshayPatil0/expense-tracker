import {
  ColorSchemeName,
  useColorScheme as defaultUseColorScheme,
} from "react-native";
import Colors from "../constants/Colors";

export const useColors = ():
  | (typeof Colors)["dark"]
  | (typeof Colors)["light"] => {
  const colorScheme = defaultUseColorScheme();

  // return colorScheme ?? "dark";
  return Colors["dark"];
};
