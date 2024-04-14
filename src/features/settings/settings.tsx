import SafeView from "@/components/layout/SafeView";
import { TopBar } from "@/components/layout/TopBar";
import { StyleSheet } from "react-native";
import Header from "./components/Header";

export default function SettingsPage() {
  return (
    <>
      <TopBar useSafeArea>
        <Header />
      </TopBar>
      <SafeView></SafeView>
    </>
  );
}

const styles = StyleSheet.create({});
