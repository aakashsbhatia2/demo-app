import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { HREFS } from "@/constants/routes";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import type { SavedRoute } from "@/types/saved-route";
import { formatSavedDate } from "@/utils/date";
import { formatDistance } from "@/utils/distance";

type Props = {
  route: SavedRoute;
};

export function SavedRouteRow({ route }: Props) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(HREFS.routeDetail(route.id))}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.main}>
        <Text style={styles.name} numberOfLines={1}>
          {route.name}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.date}>{formatSavedDate(route.createdAt)}</Text>
          {route.isLoop ? <Text style={styles.tag}>Loop</Text> : null}
        </View>
      </View>
      <Text style={styles.distance}>{formatDistance(route.distanceMeters)}</Text>
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
    gap: spacing.xs,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: "600",
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
  distance: {
    fontSize: fontSize.md,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    color: colors.text,
  },
});
