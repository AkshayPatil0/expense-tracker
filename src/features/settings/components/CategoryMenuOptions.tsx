import {
  Text,
  TextInput as ThemedTextInput,
  View as ThemedView,
} from "@/theme/components/Themed";
import { StyleSheet, TextInput, View } from "react-native";
import MenuOptionsSelectItem from "./MenuOptionsSelectItem";
import Separator from "@/components/layout/Separator";
import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useCategoryStore } from "@/store/category";
import { IconButton } from "@/components/IconButton";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { isEmoji } from "@/utils/common";
import EmojiInput from "@/components/emojiKeyboard/EmojiInput";

export default function CategoryMenuOptions() {
  const { categories } = useCategoryStore();
  return (
    <ThemedView style={styles.options} backgroundDef="background3">
      {categories.map((category, i) => (
        <Fragment key={category.id}>
          <ListItem
            label={category.name}
            icon={category.icon}
            key={category.id}
          />
          {i < categories.length - 1 ? <Separator color="background2" /> : null}
        </Fragment>
      ))}
    </ThemedView>
  );
}

function ListItem(props: { icon: string; label: string }) {
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
        />
      );
    case "edit":
      return (
        <EditModeItem
          label={props.label}
          icon={props.icon}
          onCancel={() => setMode("normal")}
          onSubmit={() => {}}
          edit={edit}
        />
      );

    case "delete":
      return (
        <DeleteModeItem
          label={props.label}
          icon={props.icon}
          onCancel={() => setMode("normal")}
          onDelete={() => {}}
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
}) {
  return (
    <GestureHandlerRootView>
      <View style={styles.listItem}>
        <TouchableOpacity onPress={props.onPressIcon}>
          <Text style={styles.icon}>{props.icon}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          containerStyle={styles.labelWrapper}
          onPress={props.onPressLabel}
        >
          <Text style={styles.label}>{props.label}</Text>
        </TouchableOpacity>
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
  onSubmit: (val: string) => void;
  onCancel: () => void;
}) {
  const [updatedLabel, setUpdatedLabel] = useState(props.label);
  const [updatedIcon, setUpdatedIcon] = useState(props.icon);

  const labelInputRef = useRef<TextInput>(null);
  const iconInputRef = useRef<TextInput>(null);

  useEffect(() => {
    setUpdatedLabel(props.label);
  }, [props.label]);

  useEffect(() => {
    setUpdatedIcon(props.icon);
  }, [props.icon]);

  useLayoutEffect(() => {
    if (props.edit === "icon") {
      iconInputRef.current?.focus();
      return;
    }
    labelInputRef.current?.focus();
  }, [props.edit]);

  return (
    <View style={styles.labelWrapper}>
      <View style={styles.listItem}>
        {/* <ThemedTextInput
          ref={iconInputRef}
          style={styles.editIcon}
          backgroundDef="background3"
          value={updatedIcon}
          selection={{
            start: 1,
            end: 10,
          }}
          onSelectionChange={(e) => {
            console.log("selection", e.nativeEvent.selection);
          }}
          onChangeText={(text) => {
            console.log({ text });
            // const val = text.replace(updatedIcon, "");
            // console.log({ val }, isEmoji(val));
            // if (isEmoji(val)) {
            setUpdatedIcon(text);
            // }
          }}
        /> */}
        <EmojiInput value={updatedIcon} onSelect={setUpdatedIcon} />
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
          onPress={() => props.onSubmit(updatedLabel)}
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
      <Text style={styles.icon}>{props.icon}</Text>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
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
