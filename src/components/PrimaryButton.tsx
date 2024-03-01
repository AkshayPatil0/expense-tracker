import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from "@/theme/components/Themed";

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  titleProps?: TextProps;
};

export function PrimaryButton(props: ButtonProps) {
  const { style, titleProps, ...otherProps } = props;

  return (
    <TouchableOpacity
      {...otherProps}
      style={style}
      backgroundDef="primaryButtonBg"
    >
      <Text
        {...titleProps}
        style={titleProps?.style}
        colorDef="primaryButtonText"
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}
