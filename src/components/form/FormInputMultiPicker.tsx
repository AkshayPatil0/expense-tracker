import { Pressable, StyleSheet, Touchable } from "react-native";

import { useRef, useState } from "react";
// import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

import { ScrollView, View } from "@/theme/components/Themed";
import { useColorScheme } from "@/theme/hooks/useColorScheme";
import Colors from "@/theme/constants/Colors";
import { Pill } from "../Pill";

export interface FormInputMultiPickerProps {
  items: { label: string; value: string }[];
  placeholder: string;
}

export default function FormInputMultiPicker(props: FormInputMultiPickerProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [pickerValue, setPickerValue] = useState<string>("");
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleSelect = (val: string) => {
    setPickerValue(val);
    setSelectedValues((prevValues) =>
      Array.from(new Set([...prevValues, val])).filter(Boolean)
    );
  };

  const removeSelection = (val: string) => () => {
    setSelectedValues((prevValues) => prevValues.filter((pv) => pv !== val));
    setPickerValue("");
  };

  const pickerRef = useRef<RNPickerSelect>(null);

  const openPicker = () => {
    if (!pickerRef.current) return;
    pickerRef.current.togglePicker(true);
  };
  return (
    <View style={{ ...styles.root, backgroundColor: colors.background2 }}>
      <RNPickerSelect
        ref={pickerRef}
        value={pickerValue}
        onValueChange={handleSelect}
        items={props.items}
        darkTheme={colorScheme == "dark"}
        style={{
          inputIOS: {
            padding: 16,
            fontSize: 16,
            color: colors.background2,
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
      {selectedValues.length > 0 && (
        <Pressable style={styles.pillContainer} onPress={openPicker}>
          <ScrollView
            backgroundDef={"background2"}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 4,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {selectedValues.map((val) => (
              <Pill value={val} key={val} onClose={removeSelection(val)} />
            ))}
          </ScrollView>
        </Pressable>
      )}
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
  pillContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
