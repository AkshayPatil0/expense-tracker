import { TopBar } from "@/components/layout/TopBar";
import Header from "./components/Header";
import SafeScrollView from "@/components/layout/SafeScrollView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { GraphWithBanner } from "./components/GraphWithBanner";

export default function Insights() {
  return (
    <>
      <TopBar useSafeArea>
        <Header />
      </TopBar>
      <GestureHandlerRootView>
        <SafeScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          <GraphWithBanner />
        </SafeScrollView>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({});
