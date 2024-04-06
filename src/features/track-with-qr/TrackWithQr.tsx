import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "@/theme/components/Themed";
import { useState } from "react";
import { DecodedUpiQr } from "./services/upiQrService";
import QrScannerScreen from "./screens/QrScannerScreen";
import ScannedQrStageScreen from "./screens/ScannedQrStageScreen";
import { useDecodedQr } from "./store/decoded-qr";

export default function TrackWithQrScreen() {
  const { decodedQr, setDecodedQr } = useDecodedQr();

  if (decodedQr) {
    return <ScannedQrStageScreen />;
  }

  return <QrScannerScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  qrScanner: {
    width: "100%",
  },
});
