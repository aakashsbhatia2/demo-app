import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import type { SavedRoute } from "@/types/saved-route";
import { formatSavedDate } from "@/utils/date";
import { formatDistance } from "@/utils/distance";

type Props = {
  route: SavedRoute;
  onStartRun: () => void;
  onGroupRun: () => void;
};

export function RouteDetailPanel({ route, onStartRun, onGroupRun }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.panel, { paddingBottom: insets.bottom + spacing.md }]}>
      <Text style={styles.distance}>{formatDistance(route.distanceMeters)}</Text>
      <View style={styles.meta}>
        <Text style={styles.date}>Saved {formatSavedDate(route.createdAt)}</Text>
        {route.isLoop ? <Text style={styles.tag}>Loop</Text> : null}
      </View>
      <Button
        label="Start run"
        onPress={onStartRun}
        variant="primary"
        style={styles.firstAction}
      />
      <Button
        label="Group run"
        onPress={onGroupRun}
        variant="secondary"
        style={styles.action}
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
    color: colors.text,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  date: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  tag: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.xs,
    overflow: "hidden",
  },
  firstAction: {
    marginTop: spacing.md,
  },
  action: {
    marginTop: spacing.xs,
  },
});
