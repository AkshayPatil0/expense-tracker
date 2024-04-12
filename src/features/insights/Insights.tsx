import { TopBar } from "@/components/layout/TopBar";
import Header from "./components/Header";
import SafeView from "@/components/layout/SafeView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { GraphWithBanner } from "./components/GraphWithBanner";
import SelectedExpenseList from "./components/SelectedExpenseList";
import Spacer from "@/components/layout/Spacer";
import { ScrollView, View } from "@/theme/components/Themed";

export default function Insights() {
  return (
    <>
      <TopBar useSafeArea>
        <Header />
      </TopBar>
      <GestureHandlerRootView>
        <SafeView>
          <View style={{ height: "40%" }}>
            <GraphWithBanner />
          </View>
          <Spacer space="1%" />
          <ScrollView style={{ height: "59%", paddingVertical: 24 }}>
            <SelectedExpenseList />
            <Spacer space={64} />
          </ScrollView>
        </SafeView>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({});
