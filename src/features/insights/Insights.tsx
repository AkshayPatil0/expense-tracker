import { TopBar } from "@/components/layout/TopBar";
import Header from "./components/Header";
import SafeView from "@/components/layout/SafeView";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { GraphWithBanner } from "./components/GraphWithBanner";
import SelectedExpenseList from "./components/SelectedExpenseList";
import Spacer from "@/components/layout/Spacer";
import { ScrollView, View } from "@/theme/components/Themed";
import SafeScrollView from "@/components/layout/SafeScrollView";

export default function Insights() {
  return (
    <>
      <TopBar useSafeArea>
        <Header />
      </TopBar>
      <GestureHandlerRootView>
        <SafeScrollView showsVerticalScrollIndicator={false}>
          <View style={{ height: 300 }}>
            <GraphWithBanner />
          </View>
          <Spacer space={16} />
          <SelectedExpenseList />
          <Spacer space={64} />
        </SafeScrollView>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({});
