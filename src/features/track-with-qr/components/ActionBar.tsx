import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Icon, Text, View } from "@/theme/components/Themed";
import { useColors } from "@/theme/hooks/useColors";
import {
  DecodedUpiQr,
  UpiApps,
  generateUpiDeepLink,
} from "../services/upiQrService";
import { SubmitButton } from "@/components/form/SubmitButton";

export interface ActionBarProps {
  decodedQr: DecodedUpiQr;
  amount: number;
}

export function ActionBar(props: ActionBarProps) {
  const colors = useColors();

  const handleSubmit = () => {
    const upiDeepLink = generateUpiDeepLink(
      {
        ...props.decodedQr,
        am: props.amount,
      },
      UpiApps.phonepe
    );
    console.log(upiDeepLink);
    Linking.openURL(upiDeepLink);
  };
  return (
    <View style={styles.root}>
      <SubmitButton title="Pay now and Track later" onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
    padding: 16,
    paddingTop: 24,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
