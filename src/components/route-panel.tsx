import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import { formatDistance } from "@/utils/distance";

type Props = {
  distance: number | null;
  pointCount: number;
  isLoop: boolean;
  canUndo: boolean;
  canCloseLoop: boolean;
  canSave: boolean;
  saveLabel?: string;
  onUndo: () => void;
  onCloseLoop: () => void;
  onClear: () => void;
  onSave: () => void;
};

export function RoutePanel({
  distance,
  pointCount,
  isLoop,
  canUndo,
  canCloseLoop,
  canSave,
  saveLabel = "Save route",
  onUndo,
  onCloseLoop,
  onClear,
  onSave,
}: Props) {
  const insets = useSafeAreaInsets();

  const hint =
    pointCount === 0
      ? "Tap the map to set your start"
      : isLoop
        ? "Loop complete"
        : "Tap to add the next point";

  return (
    <View style={[styles.panel, { paddingBottom: insets.bottom + spacing.md }]}>
      <Text style={styles.distance}>{formatDistance(distance)}</Text>
      <Text style={styles.hint}>{hint}</Text>

      <View style={styles.buttons}>
        <Button
          label="Undo"
          onPress={onUndo}
          disabled={!canUndo}
          variant="secondary"
          style={styles.button}
        />
        <Button
          label="Close loop"
          onPress={onCloseLoop}
          disabled={!canCloseLoop}
          variant="secondary"
          style={styles.button}
        />
        <Button
          label="Clear"
          onPress={onClear}
          disabled={pointCount === 0}
          variant="secondary"
          style={styles.button}
        />
      </View>

      <Button
        label={saveLabel}
        onPress={onSave}
        disabled={!canSave}
        variant="primary"
        style={styles.save}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    boxShadow: "0 -2px 12px rgba(0, 0, 0, 0.12)",
  },
  distance: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  hint: {
    marginTop: 2,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
  },
  save: {
    marginTop: spacing.xs,
  },
});
