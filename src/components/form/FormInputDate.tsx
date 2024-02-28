import { Button, StyleSheet } from "react-native";

import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { View } from "@/theme/components/Themed";
import { useColorScheme } from "@/theme/hooks/useColorScheme";
import Colors from "@/theme/constants/Colors";

export interface FormInputDateProps {
  value: Date;
  onChange: (value: Date) => void;
}

export default function FormInputDate(props: FormInputDateProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleChange = (e: DateTimePickerEvent, newDate: Date | undefined) => {
    if (!newDate) return;
    props.onChange(newDate);
  };

  return (
    <View backgroundDef="background2" style={styles.root}>
      <DateTimePicker
        value={props.value}
        mode="datetime"
        textColor={colors.text}
        accentColor={colors.tint}
        onChange={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    height: "100%",
    borderRadius: 12,
    paddingVertical: 8,
  },
});
