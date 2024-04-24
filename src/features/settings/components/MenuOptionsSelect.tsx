import { View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";
import { MenuOptionItem } from "../constants/options";
import MenuOptionsSelectItem from "./MenuOptionsSelectItem";
import Separator from "@/components/layout/Separator";
import { Fragment } from "react";

interface MenuOptionsSelectProps {
  options: MenuOptionItem[];
}

export default function MenuOptionsSelect(props: MenuOptionsSelectProps) {
  return (
    <View style={styles.options} backgroundDef="background3">
      {props.options.map((option, i) => (
        <Fragment key={option.id}>
          <MenuOptionsSelectItem option={option} key={option.id} />
          {i < props.options.length - 1 ? (
            <Separator color="background2" />
          ) : null}
        </Fragment>
      ))}
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
});
