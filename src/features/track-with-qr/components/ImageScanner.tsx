import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
} from "react-native";
import { IconButton } from "@/components/IconButton";
import * as ImagePicker from "expo-image-picker";
import * as BarCodeScanner from "expo-barcode-scanner";

type QrImageScannerProps = {
  onScanned: (data: string) => void;
};

export default function QrImageScanner(props: QrImageScannerProps) {
  const pickImage = async (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    // No permissions request is necessary for launching the image library

    // pick an image from gallery
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    // if the user successfully picks an image then we check if the image has a QR code
    if (result && result.assets && result.assets[0].uri) {
      try {
        const scannedResults = await BarCodeScanner.scanFromURLAsync(
          result.assets[0].uri
        );
        props.onScanned(scannedResults[0].data);
      } catch (error) {}
    }
  };

  return <IconButton icon="image" size={24} onPress={pickImage} border={1} />;
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
