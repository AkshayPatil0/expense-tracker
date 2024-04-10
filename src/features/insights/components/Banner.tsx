import { Icon, Text, View } from "@/theme/components/Themed";
import { StyleSheet } from "react-native";

interface BannerProps {
  title: string;
  amount: string;
  frequency: string;
  percentage: number;
}

export default function Banner(props: BannerProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.title} colorDef="disabledText">
        {props.title}
      </Text>
      <View style={styles.content}>
        <View>
          <Text style={styles.amount}>₹ {props.amount}</Text>
          <Text style={styles.frequency}>{props.frequency}</Text>
        </View>
        <View style={styles.percentageContainer}>
          {props.percentage > 0 ? (
            <Icon name="caret-up" size={20} colorDef="danger" />
          ) : (
            <Icon name="caret-down" size={20} colorDef="success" />
          )}
          <Text
            style={styles.percentage}
            colorDef={props.percentage > 0 ? "danger" : "success"}
          >
            {props.percentage}%
          </Text>
          <Icon
            style={styles.infoIcon}
            name="circle-info"
            size={12}
            colorDef="disabledText"
          />
        </View>
      </View>
    </View>
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
  },
  infoIcon: { paddingLeft: 8 },
});
