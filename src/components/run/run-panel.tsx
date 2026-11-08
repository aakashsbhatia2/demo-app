import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { RunStat } from "@/components/run/run-stat";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import type { RunStatus } from "@/types/run";
import { formatDistance } from "@/utils/distance";
import { formatDuration, formatPace } from "@/utils/run-stats";

type Stats = {
  distanceMeters: number;
  routeMeters: number;
  remainingMeters: number;
  elapsedMs: number;
  averagePace: number | null;
  currentPace: number | null;
};

type Props = {
  status: RunStatus;
  stats: Stats;
  isBusy: boolean;
  error: string | null;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onFinish: () => void;
  onSave: () => void;
  onDiscard: () => void;
};

export function RunPanel({
  status,
  stats,
  isBusy,
  error,
  onStart,
  onPause,
  onResume,
  onFinish,
  onSave,
  onDiscard,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.panel, { paddingBottom: insets.bottom + spacing.md }]}>
      <Text style={styles.heading}>{HEADINGS[status]}</Text>

      <View style={styles.stats}>
        <RunStat label="Distance" value={formatDistance(stats.distanceMeters)} />
        <RunStat label="Time" value={formatDuration(stats.elapsedMs)} />
      </View>
      <View style={styles.stats}>
        {status === "finished" ? (
          <RunStat label="Avg pace" value={formatPace(stats.averagePace)} />
        ) : (
          <RunStat label="Pace" value={formatPace(stats.currentPace)} />
        )}
        {status === "finished" ? (
          <RunStat label="Route" value={formatDistance(stats.routeMeters)} />
        ) : (
          <RunStat label="Left" value={formatDistance(stats.remainingMeters)} />
        )}
      </View>

      <FormError message={error} />

      <View style={styles.buttons}>
        {status === "idle" ? (
          <Button
            label={isBusy ? "Starting…" : "Start run"}
            onPress={onStart}
            disabled={isBusy}
            variant="primary"
            style={styles.button}
          />
        ) : null}
        {status === "running" ? (
          <Button label="Pause" onPress={onPause} disabled={isBusy} style={styles.button} />
        ) : null}
        {status === "paused" ? (
          <Button label="Resume" onPress={onResume} disabled={isBusy} style={styles.button} />
        ) : null}
        {status === "running" || status === "paused" ? (
          <Button
            label="Finish"
            onPress={onFinish}
            disabled={isBusy}
            variant="primary"
            style={styles.button}
          />
        ) : null}
        {status === "finished" ? (
          <Button
            label="Discard"
            onPress={onDiscard}
            disabled={isBusy}
            variant="danger"
            style={styles.button}
          />
        ) : null}
        {status === "finished" ? (
          <Button
            label={isBusy ? "Saving…" : "Save run"}
            onPress={onSave}
            disabled={isBusy}
            variant="primary"
            style={styles.button}
          />
        ) : null}
      </View>
    </View>
  );
}

const HEADINGS: Record<RunStatus, string> = {
  idle: "Ready when you are",
  running: "Running",
  paused: "Paused",
  finished: "Run complete",
};

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
  heading: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.textMuted,
  },
  stats: {
    flexDirection: "row",
    gap: spacing.md,
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  button: {
    flex: 1,
  },
});
