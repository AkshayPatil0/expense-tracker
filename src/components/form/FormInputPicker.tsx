import { Button, StyleSheet } from "react-native";

import { useEffect, useRef, useState } from "react";
// import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

import { Icon, View } from "@/theme/components/Themed";
import { useColorScheme } from "@/theme/hooks/useColorScheme";
import Colors from "@/theme/constants/Colors";

export interface FormInputPickerProps {
  items: { label: string; value: string }[];
  placeholder: string;
}

export default function FormInputPicker(props: FormInputPickerProps) {
  const [selectedValue, setSelectedValue] = useState("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View style={{ ...styles.root, backgroundColor: colors.background2 }}>
      <RNPickerSelect
        value={selectedValue}
        onValueChange={setSelectedValue}
        items={props.items}
        darkTheme={colorScheme == "dark"}
        style={{
          inputIOS: {
            padding: 16,
            fontSize: 16,
            color: colors.text,
          },
          placeholder: {
            color: colors.disabledText,
          },
          chevronUp: {
            display: "none",
          },
          chevronDown: {
            display: "none",
          },
        }}
        placeholder={{
          label: props.placeholder,
          value: "",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  picker: {
    width: "100%",
    height: "100%",
  },
});
