import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontSize, radius, spacing } from "@/constants/theme";
import { formatDistance } from "@/utils/distance";
import type { BoardRow } from "@/utils/group-run";

const DOT_SIZE = 10;
const NO_DISTANCE = "–";

type Props = {
  rows: BoardRow[];
  canEnd: boolean;
  onEnd: () => void;
};

export function RunnerBoard({ rows, canEnd, onEnd }: Props) {
  return (
    <View style={styles.card}>
      {rows.map((row) => (
        <View key={row.id} style={styles.row}>
          <View style={[styles.dot, { backgroundColor: row.isStale ? colors.stale : row.color }]} />
          <Text style={[styles.name, row.isStale && styles.stale]} numberOfLines={1}>
            {row.name}
          </Text>
          <Text style={[styles.distance, row.isStale && styles.stale]}>
            {row.distanceMeters === null ? NO_DISTANCE : formatDistance(row.distanceMeters)}
          </Text>
        </View>
      ))}
      {canEnd ? (
        <Pressable onPress={onEnd} style={styles.end} accessibilityRole="button">
          <Text style={styles.endLabel}>End for everyone</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    gap: spacing.xxs,
    padding: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.12)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  name: {
    flex: 1,
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.text,
  },
  distance: {
    fontSize: fontSize.sm,
    fontVariant: ["tabular-nums"],
    color: colors.text,
  },
  stale: {
    color: colors.stale,
  },
  end: {
    alignSelf: "flex-end",
    paddingTop: spacing.xxs,
  },
  endLabel: {
    fontSize: fontSize.xs,
    fontWeight: "600",
    color: colors.error,
  },
});
