import { StyleSheet } from "react-native";
import { Text, View } from "@/theme/components/Themed";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera/next";
import { useEffect, useState } from "react";
import {
  DecodedUpiQr,
  decodeUpiQr,
} from "@/features/track-with-qr/services/upiQrService";
import { IconButton } from "@/components/IconButton";
import QrImageScanner from "./ImageScanner";

type QrScannerProps = {
  onScanned: (decodedQr: DecodedUpiQr) => void;
  style?: CameraView["props"]["style"];
};

export default function QrScanner(props: QrScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<boolean>(false);

  useEffect(() => {
    if (!permission) return;

    if (permission.granted) return;

    requestPermission();
  }, [permission]);

  if (!permission) return null;

  if (!permission?.granted) {
    return (
      <View style={styles.noPermissionContainer}>
        <Text style={styles.title}>Allow camera permission to scan QR</Text>
      </View>
    );
  }

  const onBarcodeScanned = (data: string) => {
    try {
      const decodedQr = decodeUpiQr(data);
      console.log({ decodedQr });
      props.onScanned(decodedQr);
    } catch (err) {}
  };

  return (
    <View style={styles.scannerContainer}>
      <CameraView
        style={styles.camera}
        type="back"
        onBarcodeScanned={(e) => onBarcodeScanned(e.data)}
        enableTorch={flash}
      />
      <View style={styles.optionsContainer}>
        <QrImageScanner onScanned={onBarcodeScanned} />
        <IconButton
          background={flash ? "tint" : "background"}
          color={flash ? "background" : "tint"}
          icon="bolt-lightning"
          size={24}
          onPress={() => setFlash(!flash)}
          border={1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: "80%",
    aspectRatio: 1,
  },
  noPermissionContainer: {
    flex: 1,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
  scannerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
});
