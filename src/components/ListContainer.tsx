import { Text, View } from "@/theme/components/Themed";
import { ReactElement } from "react";
import { StyleSheet } from "react-native";
import Separator from "@/components/Separator";

export interface ListContainerProps {
  title: ReactElement;
  rightInfo?: ReactElement;
  children: ReactElement | ReactElement[];
}

export default function ListContainer(props: ListContainerProps) {
  return (
    <View style={style.root}>
      <View style={style.header}>
        <View style={style.titleContainer}>{props.title}</View>
        <View style={style.rightInfo}>{props.rightInfo}</View>
      </View>
      <Separator />
      <View style={style.children}>{props.children}</View>
    </View>
  );
}

const style = StyleSheet.create({
  root: {
    padding: 16,
  },
  header: {
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleContainer: {},
  rightInfo: {},
  total: {},
  children: {
    paddingTop: 16,
  },
});
