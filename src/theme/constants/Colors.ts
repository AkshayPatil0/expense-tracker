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
    danger: "red",

    warning1: "#ffbb33",
    warning2: "#FF8800",
  },
  dark: {
    text: "#fff",
    disabledText: "#939598",
    background: "#000",
    tint: tintColorDark,
    iconDefault: "#9EABB8",
    tabIconDefault: "#9EABB8",
    tabIconSelected: tintColorDark,
    background2: "#1F2022",
    background3: "#101010",
    primaryButtonBg: tintColorDark,
    primaryButtonText: tintContrastDark,
    danger: "#C00000",
    warning1: "#F75A38",
    warning2: "#D98720",
  },
};
