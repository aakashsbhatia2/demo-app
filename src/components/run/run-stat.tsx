import { StyleSheet, Text, View } from "react-native";

import { colors, fontSize, spacing } from "@/constants/theme";

type Props = {
  label: string;
  value: string;
};

export function RunStat({ label, value }: Props) {
  return (
    <View style={styles.stat}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stat: {
    flex: 1,
    gap: spacing.xxs,
  },
  value: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    color: colors.text,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
