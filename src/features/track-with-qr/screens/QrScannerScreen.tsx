import { StyleSheet } from "react-native";
import { Text, View } from "@/theme/components/Themed";
import { DecodedUpiQr } from "@/features/track-with-qr/services/upiQrService";
import QrScanner from "../components/QrScanner";
import { useIsFocused } from "@react-navigation/native";
import SafeView from "@/components/SafeView";
import { useDecodedQr } from "../store/decoded-qr";

export default function QrScannerScreen() {
  const isFocused = useIsFocused();
  const { setDecodedQr } = useDecodedQr();

  return (
    <SafeView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>Scan a QR</Text>
        {isFocused && <QrScanner onScanned={setDecodedQr} />}
      </View>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 48,
  },
});
