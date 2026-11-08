import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { HREFS } from "@/constants/routes";
import { colors, fontSize, spacing } from "@/constants/theme";
import type { SavedRunSummary } from "@/types/saved-run";
import { formatRunDate } from "@/utils/date";
import { formatDistance } from "@/utils/distance";
import { formatDuration, formatPace, paceSecondsPerMile } from "@/utils/run-stats";

type Props = {
  run: SavedRunSummary;
};

const DELETED_ROUTE_LABEL = "Route deleted";

export function RunRow({ run }: Props) {
  const router = useRouter();
  const pace = paceSecondsPerMile(run.distanceMeters, run.durationMs / 1000);

  return (
    <Pressable
      onPress={() => router.push(HREFS.runDetail(run.id))}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.main}>
        <Text style={styles.name} numberOfLines={1}>
          {run.routeName ?? DELETED_ROUTE_LABEL}
        </Text>
        <Text style={styles.meta}>
          {formatRunDate(run.startedAt)} · {formatDuration(run.durationMs)} · {formatPace(pace)}
        </Text>
      </View>
      <Text style={styles.distance}>{formatDistance(run.distanceMeters)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  pressed: {
    backgroundColor: colors.surfaceMuted,
  },
  main: {
    flex: 1,
    gap: spacing.xxs,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
  },
  meta: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontVariant: ["tabular-nums"],
  },
  distance: {
    fontSize: fontSize.md,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    color: colors.text,
  },
});
