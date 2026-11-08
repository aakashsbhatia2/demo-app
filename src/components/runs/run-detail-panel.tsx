import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RunStat } from "@/components/run/run-stat";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import type { SavedRun } from "@/types/saved-run";
import { formatRunDate } from "@/utils/date";
import { formatDistance } from "@/utils/distance";
import { formatDuration, formatPace, paceSecondsPerMile } from "@/utils/run-stats";

type Props = {
  run: SavedRun;
};

export function RunDetailPanel({ run }: Props) {
  const insets = useSafeAreaInsets();
  const pace = paceSecondsPerMile(run.distanceMeters, run.durationMs / 1000);

  return (
    <View style={[styles.panel, { paddingBottom: insets.bottom + spacing.md }]}>
      <Text style={styles.date}>{formatRunDate(run.startedAt)}</Text>
      <View style={styles.stats}>
        <RunStat label="Distance" value={formatDistance(run.distanceMeters)} />
        <RunStat label="Time" value={formatDuration(run.durationMs)} />
        <RunStat label="Avg pace" value={formatPace(pace)} />
      </View>
      <View style={styles.legend}>
        <LegendItem color={colors.primary} label="Planned route" />
        <LegendItem color={colors.trail} label="Your run" />
      </View>
    </View>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.swatch, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    gap: spacing.md,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    boxShadow: "0 -2px 12px rgba(0, 0, 0, 0.12)",
  },
  date: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.textMuted,
  },
  stats: {
    flexDirection: "row",
    gap: spacing.md,
  },
  legend: {
    flexDirection: "row",
    gap: spacing.md,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  swatch: {
    width: spacing.md,
    height: spacing.xxs,
    borderRadius: spacing.xxs,
  },
  legendLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
});
