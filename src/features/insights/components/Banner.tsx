import { Icon, Text, View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";
import { Popable } from "react-native-popable";
import { TimeSpan } from "../store/insights-store";
import { useColors } from "@/theme/hooks/useColors";
import AnimatedEntry from "@/components/animation/AnimatedEntry";

interface BannerProps {
  title: string;
  amount: number;
  frequency: string;
  percentage: number;
  timeSpan: TimeSpan;
}

const getPercentageInsight = (per: number, timeSpan: TimeSpan) => {
  if (per > 0)
    return `Whoa 😱 \nYour spending went up ${per}% 🚀 compared to last ${timeSpan}.`;
  if (per < 0)
    return `Yay 😀 \nSpending down by ${Math.abs(
      per
    )}% 📉 since last ${timeSpan}.`;
  return "Nothing interesting here 🙂";
};

export default function Banner(props: BannerProps) {
  const colors = useColors();
  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title} colorDef="disabledText">
          {props.title}
        </Text>
        <Text style={styles.frequency} colorDef="disabledText">
          {props.frequency}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.percentageContainer}>
          <AnimatedEntry
            style={styles.percentageContainer}
            dependencies={[props.percentage]}
          >
            <PercentageContainer percentage={props.percentage} />
          </AnimatedEntry>
          <Popable
            content={getPercentageInsight(props.percentage, props.timeSpan)}
            position="left"
            caretPosition="center"
            animated
            animationType="spring"
            backgroundColor={colors.background2}
            style={{ width: 150 }}
          >
            <Icon
              style={styles.infoIcon}
              name="circle-info"
              size={12}
              colorDef="disabledText"
            />
          </Popable>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 8 }}>
          <AnimatedEntry dependencies={[props.amount]}>
            <Text style={styles.amount}>₹ {props.amount.toFixed()}</Text>
          </AnimatedEntry>
        </View>
      </View>
    </View>
  );
}

function PercentageContainer({ percentage }: { percentage: number }) {
  return (
    <>
      {percentage > 0 ? (
        <Icon name="caret-up" size={20} colorDef="danger" />
      ) : (
        <Icon name="caret-down" size={20} colorDef="success" />
      )}
      <Text
        style={styles.percentage}
        colorDef={percentage > 0 ? "danger" : "success"}
      >
        {percentage}%
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 24,
    fontWeight: "900",
  },
  percentageContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  percentage: {
    fontSize: 20,
    fontWeight: "900",
  },
  frequency: {
    fontSize: 14,
    textTransform: "uppercase",
  },
  infoIcon: { paddingLeft: 8 },
});
