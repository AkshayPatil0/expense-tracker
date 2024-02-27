import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
} from "react-native";

import { ReactElement, useState } from "react";
import { Icon, Text, TextInput, View } from "@/theme/components/Themed";

export type FormInputContainerProps = {
  label: string;
  children: ReactElement;
  icon?: string;
  size?: "small" | "large";
};

export function FormInputContainer(props: FormInputContainerProps) {
  return (
    <View
      style={{
        ...styles.root,
      }}
    >
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View style={styles.inputContainer}>
        {props.children}
        {props.icon && (
          <Icon style={styles.inputIcon} name={props.icon} size={16} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 2,
  },
  labelContainer: {
    width: "100%",
    height: 32,
    paddingBottom: 8,
    flexDirection: "column",
    alignItems: "flex-start",
    flexShrink: 0,
  },
  label: {
    alignSelf: "stretch",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    right: 16,
  },
});
