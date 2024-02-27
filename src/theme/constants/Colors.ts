// const tintColorLight = "#2f95dc";
const tintColorLight = "#000";
const tintContrastLight = "#fff";
const tintColorDark = "#fff";
const tintContrastDark = "#000";

export default {
  light: {
    text: "#000",
    disabledText: "#90a4ae",
    background: "#fff",
    tint: tintColorLight,
    iconDefault: "#9EABB8",
    tabIconDefault: "#37474f",
    tabIconSelected: tintColorLight,
    background2: "#DEE4E7",
    background3: "#FFFFF0",
    primaryButtonBg: tintColorLight,
    primaryButtonText: tintContrastLight,
  },
  dark: {
    text: "#fff",
    disabledText: "#90a4ae",
    background: "#11151c",
    tint: tintColorDark,
    iconDefault: "#9EABB8",
    tabIconDefault: "#9EABB8",
    tabIconSelected: tintColorDark,
    background2: "#212d40",
    background3: "#222222",
    primaryButtonBg: tintColorDark,
    primaryButtonText: tintContrastDark,
  },
};
