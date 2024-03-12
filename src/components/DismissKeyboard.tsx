// import { View } from "@/theme/components/Themed";
import React, {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ViewProps,
} from "react-native";

const DismissKeyboardHOC = <P extends PropsWithChildren>(
  Comp: ComponentType<P>
): FunctionComponent<P> => {
  const Component = Comp as ComponentType<PropsWithChildren>;
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Component {...props}>{children}</Component>
    </TouchableWithoutFeedback>
  );
};
export const DismissKeyboardView = DismissKeyboardHOC<ViewProps>(View);
