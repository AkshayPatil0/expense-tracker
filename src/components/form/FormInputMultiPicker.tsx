import { Pressable, StyleSheet } from "react-native";

import { useRef, useState } from "react";
import RNPickerSelect from "react-native-picker-select";

import { ScrollView, View } from "@/theme/components/Themed";
import { useColorScheme } from "@/theme/hooks/useColorScheme";
import Colors from "@/theme/constants/Colors";
import { Pill } from "../Pill";

export interface FormInputMultiPickerProps {
  items: { label: string; value: string }[];
  placeholder: string;
  values: string[];
  onChange: (values: string[]) => void;
}

export default function FormInputMultiPicker(props: FormInputMultiPickerProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const [pickerValue, setPickerValue] = useState("");

  const handleSelect = (val: string) => {
    props.onChange(Array.from(new Set([...props.values, val])).filter(Boolean));
  };

  const removeSelection = (val: string) => () => {
    props.onChange(props.values.filter((pv) => pv !== val));
    setPickerValue("");
  };

  const stagedValue = useRef("");

  const onChange = (val: string) => {
    setPickerValue(val);
    stagedValue.current = val;
  };

  const onDone = () => {
    handleSelect(stagedValue.current);
    stagedValue.current = "";
  };

  const pickerRef = useRef<RNPickerSelect>(null);

  const openPicker = () => {
    if (!pickerRef.current) return;
    pickerRef.current.togglePicker(true);
  };
  return (
    <View style={{ ...styles.root, backgroundColor: colors.background2 }}>
      <RNPickerSelect
        value={pickerValue}
        ref={pickerRef}
        onValueChange={onChange}
        onDonePress={onDone}
        onClose={() => setPickerValue("")}
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
      {props.values.length > 0 && (
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
            {props.values.map((val) => (
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
