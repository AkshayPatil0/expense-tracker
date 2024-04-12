import { IconButton } from "@/components/IconButton";
import {
  ColorDefinition,
  Text,
  View as ThemedView,
} from "@/theme/components/Themed";
import dayjs from "dayjs";
import { ReactElement } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  Swipeable,
  SwipeableProps,
  TapGestureHandler,
} from "react-native-gesture-handler";

export interface ListItemProps {
  children: ReactElement[];
  background?: ColorDefinition;
  renderLeftActions?: SwipeableProps["renderLeftActions"];
  renderRightActions?: SwipeableProps["renderRightActions"];
  onDelete?: () => void;
  onPress?: () => void;
  disableGestures?: boolean;
}

const RightActions = ({ onDelete }: { onDelete: () => void }) => {
  return (
    <View style={styles.rightActions}>
      <IconButton
        icon="trash-can"
        background={"danger"}
        size={18}
        onPress={onDelete}
      />
    </View>
  );
};

export default function ListItem(props: ListItemProps) {
  const renderRightActions = () =>
    props.onDelete && <RightActions onDelete={props.onDelete} />;

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderLeftActions={props.renderLeftActions}
        renderRightActions={
          props.renderRightActions
            ? props.renderRightActions
            : renderRightActions
        }
        leftThreshold={0}
        enabled={!props.disableGestures}
      >
        <TapGestureHandler
          onEnded={() => props.onPress && props.onPress()}
          enabled={!props.disableGestures}
        >
          <ThemedView style={styles.root} backgroundDef={props.background}>
            {props.children}
          </ThemedView>
        </TapGestureHandler>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

function IconContainer(props: {
  children: string;
  background?: ColorDefinition;
}) {
  return (
    <ThemedView
      style={styles.iconContainer}
      backgroundDef={props.background ? props.background : "background2"}
    >
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.icon}>
        {props.children}
      </Text>
    </ThemedView>
  );
}
ListItem.IconContainer = IconContainer;

function NoteTimeContainer(props: { children: ReactElement[] }) {
  return <View style={styles.noteTimeContainer}>{props.children}</View>;
}
ListItem.NoteTimeContainer = NoteTimeContainer;
function NoteContainer(props: {
  children: string;
  color?: ColorDefinition;
  italic?: boolean;
}) {
  return (
    <Text
      style={[styles.note, { fontStyle: props.italic ? "italic" : "normal" }]}
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
      style={styles.time}
      colorDef={props.color ? props.color : "disabledText"}
    >
      {dayjs(props.children).format("hh:mm A")} {}
    </Text>
  );
}
ListItem.TimeContainer = TimeContainer;

function AmountContainer(props: { children: number; color?: ColorDefinition }) {
  return (
    <View style={styles.amountContainer}>
      <Text
        adjustsFontSizeToFit
        numberOfLines={1}
        style={styles.amount}
        colorDef={props.color}
      >
        ₹ {props.children}
      </Text>
    </View>
  );
}
ListItem.AmountContainer = AmountContainer;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    gap: 10,
    height: 54,
    alignItems: "center",
    paddingVertical: 4,
  },
  iconContainer: {
    height: "94%",
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
    justifyContent: "space-around",
    // paddingVertical: 6,
    height: "100%",
  },
  note: {
    fontSize: 16,
    fontWeight: "600",
  },
  time: {},
  amountContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 4,
  },
  amount: {
    // paddingVertical: 16,
    textAlign: "center",
    // height: "100%",
    fontSize: 18,
    fontWeight: "700",
  },
  rightActions: {
    flexDirection: "row",
    paddingLeft: 16,
  },
});
