import { StyleSheet } from "react-native";

import { TextInput } from "@/theme/components/Themed";
import { useColors } from "@/theme/hooks/useColors";
import Colors from "@/theme/constants/Colors";

export type FormInputProps = {
  placeholder: string;
  disabled?: boolean;
} & (
  | {
      value?: string;
      onChange?: (value: string) => void;
      numeric?: false;
    }
  | {
      value?: number;
      onChange?: (value: number) => void;
      numeric: true;
    }
);

export function FormInputText(props: FormInputProps) {
  const value = props.numeric
    ? props.value
      ? props.value.toString()
      : ""
    : props.value;

  const handleChange = (text: string) => {
    if (!props.onChange) return;
    if (props.numeric) {
      props.onChange(+text);
      return;
    } else {
      props.onChange(text);
    }
  };

  return (
    <TextInput
      style={styles.textInput}
      colorDef={props.disabled ? "disabledText" : undefined}
      backgroundDef={props.disabled ? "background3" : undefined}
      keyboardType={props.numeric ? "numeric" : "default"}
      value={value || ""}
      onChangeText={props.onChange && handleChange}
      placeholder={props.placeholder}
      editable={!props.disabled}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    alignItems: "center",
    flexShrink: 0,
  },
  textInput: {
    width: "100%",
    height: "100%",
    padding: 16,
    paddingRight: 34,
    fontSize: 16,
    borderRadius: 12,
  },
});
