import { Text, TextInput as ThemedTextInput } from "@/theme/components/Themed";
import { StyleSheet, TextInput, View } from "react-native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IconButton } from "@/components/IconButton";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import EmojiInput, {
  EmojiInputRef,
} from "@/components/emojiKeyboard/EmojiInput";

export interface EditableListItemProps {
  icon: string;
  label: string;
  onEdit: (cat: { icon: string; label: string }) => void;
  onDelete: () => void;
  disableIconInput?: boolean;
  disableEdit?: boolean;
}

export default function EditableListItem(props: EditableListItemProps) {
  const [mode, setMode] = useState<"normal" | "edit" | "delete">("normal");
  const [edit, setEdit] = useState<"label" | "icon">("label");
  const switchToEditMode = (clicked: "label" | "icon") => {
    setMode("edit");
    setEdit(clicked);
  };
  switch (mode) {
    case "normal":
      return (
        <NormalModeItem
          label={props.label}
          icon={props.icon}
          onPressLabel={() => switchToEditMode("label")}
          onPressIcon={() => switchToEditMode("icon")}
          onPressDelete={() => setMode("delete")}
          disableEdit={props.disableEdit}
        />
      );
    case "edit":
      return (
        <EditModeItem
          label={props.label}
          icon={props.icon}
          onCancel={() => setMode("normal")}
          onSubmit={(item) => {
            props.onEdit(item);
            setMode("normal");
          }}
          edit={edit}
        />
      );

    case "delete":
      return (
        <DeleteModeItem
          label={props.label}
          icon={props.icon}
          onCancel={() => setMode("normal")}
          onDelete={props.onDelete}
        />
      );
  }
}

function NormalModeItem(props: {
  icon: string;
  label: string;
  onPressLabel: () => void;
  onPressIcon: () => void;
  onPressDelete: () => void;
  disableEdit?: boolean;
}) {
  return (
    <GestureHandlerRootView>
      <View style={styles.listItem}>
        {props.disableEdit ? (
          <ReadOnlyItem label={props.label} icon={props.icon} />
        ) : (
          <>
            <TouchableOpacity onPress={props.onPressIcon}>
              <Text style={styles.icon}>{props.icon}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              containerStyle={styles.labelWrapper}
              onPress={props.onPressLabel}
            >
              <Text style={styles.label}>{props.label}</Text>
            </TouchableOpacity>
          </>
        )}
        <IconButton
          icon="trash-can"
          background="background3"
          color="danger"
          size={14}
          padding={4}
          onPress={props.onPressDelete}
        />
      </View>
    </GestureHandlerRootView>
  );
}

function EditModeItem(props: {
  icon: string;
  label: string;
  edit: "label" | "icon";
  onSubmit: (item: { icon: string; label: string }) => void;
  onCancel: () => void;
  disableIconInput?: boolean;
}) {
  const [updatedLabel, setUpdatedLabel] = useState(props.label);
  const [updatedIcon, setUpdatedIcon] = useState(props.icon);

  const labelInputRef = useRef<TextInput>(null);
  const iconInputRef = useRef<EmojiInputRef>(null);

  useEffect(() => {
    setUpdatedLabel(props.label);
  }, [props.label]);

  useEffect(() => {
    setUpdatedIcon(props.icon);
  }, [props.icon]);

  useLayoutEffect(() => {
    if (props.edit === "icon" && !props.disableIconInput) {
      iconInputRef.current?.focus();
      return;
    }
    labelInputRef.current?.focus();
  }, [props.edit]);

  return (
    <View style={styles.labelWrapper}>
      <View style={styles.listItem}>
        {props.disableIconInput ? (
          <Text style={styles.icon}>{props.icon}</Text>
        ) : (
          <EmojiInput
            value={updatedIcon}
            onSelect={setUpdatedIcon}
            ref={iconInputRef}
          />
        )}
        <ThemedTextInput
          ref={labelInputRef}
          style={styles.editInput}
          backgroundDef="background3"
          value={updatedLabel}
          onChangeText={setUpdatedLabel}
        />
        <IconButton
          icon="check"
          background="tint"
          color="background"
          size={14}
          padding={4}
          onPress={() =>
            props.onSubmit({
              icon: updatedIcon,
              label: updatedLabel,
            })
          }
        />
        <IconButton
          icon="xmark"
          background="background3"
          color="tint"
          size={14}
          padding={4}
          onPress={props.onCancel}
        />
      </View>
    </View>
  );
}

function DeleteModeItem(props: {
  icon: string;
  label: string;
  onDelete: () => void;
  onCancel: () => void;
}) {
  return (
    <View style={styles.listItem}>
      <ReadOnlyItem label={props.label} icon={props.icon} />
      <IconButton
        icon="trash-can"
        background="danger"
        color="tint"
        size={14}
        padding={4}
        onPress={props.onDelete}
      />
      <IconButton
        icon="xmark"
        background="background3"
        color="tint"
        size={14}
        padding={4}
        onPress={props.onCancel}
      />
    </View>
  );
}

function ReadOnlyItem(props: { icon: string; label: string }) {
  return (
    <>
      <Text style={styles.icon}>{props.icon}</Text>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  options: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 10,
    borderRadius: 5,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  icon: {
    padding: 4,
  },
  editIcon: {
    borderRadius: 5,
  },
  labelWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 16,
  },
  editInput: {
    flex: 1,
    width: "100%",
    borderWidth: 0,
  },
});
