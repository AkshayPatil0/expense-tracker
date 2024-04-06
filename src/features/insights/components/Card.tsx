import { View } from "@/theme/components/Themed";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

export interface CardProps {}

export default function Card(props: PropsWithChildren<CardProps>) {
  return <View style={styles.root}>{props.children}</View>;
}

const styles = StyleSheet.create({
  root: {},
});
