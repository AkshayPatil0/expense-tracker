import PillToggle from "@/components/PillToggle";
import { StyleSheet } from "react-native";
import { TIME_SPAN, TimeSpan, useInsightsStore } from "../store/insights-store";

export default function TimeSpanToggle() {
  const { timeSpan, setTimeSpan } = useInsightsStore();
  return (
    <PillToggle<TimeSpan>
      items={[
        {
          label: "Week",
          value: TIME_SPAN.week,
        },
        {
          label: "Month",
          value: TIME_SPAN.month,
        },
        {
          label: "Year",
          value: TIME_SPAN.year,
        },
      ]}
      value={timeSpan}
      onChange={setTimeSpan}
    />
  );
}

const styles = StyleSheet.create({});
