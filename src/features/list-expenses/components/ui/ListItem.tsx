import {
  ColorDefinition,
  Text,
  View as ThemedView,
} from "@/theme/components/Themed";
import dayjs from "dayjs";
import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

export interface ListItemProps {
  children: ReactElement[];
  background?: ColorDefinition;
}

export default function ListItem(props: ListItemProps) {
  return (
    <ThemedView style={style.root} backgroundDef={props.background}>
      {props.children}
    </ThemedView>
  );
}

function IconContainer(props: {
  children: string;
  background?: ColorDefinition;
}) {
  return (
    <ThemedView
      style={style.iconContainer}
      backgroundDef={props.background ? props.background : "background2"}
    >
      <Text adjustsFontSizeToFit numberOfLines={1} style={style.icon}>
        {props.children}
      </Text>
    </ThemedView>
  );
}
ListItem.IconContainer = IconContainer;

function NoteTimeContainer(props: { children: ReactElement[] }) {
  return <View style={style.noteTimeContainer}>{props.children}</View>;
}
ListItem.NoteTimeContainer = NoteTimeContainer;
function NoteContainer(props: {
  children: string;
  color?: ColorDefinition;
  italic?: boolean;
}) {
  return (
    <Text
      style={[style.note, { fontStyle: props.italic ? "italic" : "normal" }]}
      numberOfLines={1}
      ellipsizeMode="tail"
      colorDef={props.color}
    >
      {props.children}
    </Text>
  );
}
ListItem.NoteContainer = NoteContainer;
function TimeContainer(props: { children: Date; color?: ColorDefinition }) {
  return (
    <Text
      style={style.time}
      colorDef={props.color ? props.color : "disabledText"}
    >
      {dayjs(props.children).format("hh:mm A")} {}
    </Text>
  );
}
ListItem.TimeContainer = TimeContainer;

function AmountContainer(props: { children: number; color?: ColorDefinition }) {
  return (
    <View style={style.amountContainer}>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={style.amount}
        colorDef={props.color}
      >
        ₹ {props.children}
      </Text>
    </View>
  );
}
ListItem.AmountContainer = AmountContainer;

const style = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 8,
    height: 50,
  },
  iconContainer: {
    height: "100%",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    textAlign: "center",
    height: "100%",
    aspectRatio: 1,
    fontSize: 100,
  },
  noteTimeContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  note: {
    fontSize: 16,
    fontWeight: "600",
  },
  time: {},
  amountContainer: {},
  amount: {
    paddingVertical: 16,
    textAlign: "center",
    height: "100%",
    fontSize: 18,
    fontWeight: "700",
  },
});
