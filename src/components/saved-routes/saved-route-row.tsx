import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { RouteRowActions } from "@/components/saved-routes/route-row-actions";
import { HREFS } from "@/constants/routes";
import { ROUTE_SWIPE_FRICTION, ROUTE_SWIPE_THRESHOLD } from "@/constants/saved-routes";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import type { SavedRoute } from "@/types/saved-route";
import { formatSavedDate } from "@/utils/date";
import { formatDistance } from "@/utils/distance";

type Props = {
  route: SavedRoute;
  isDeleting: boolean;
  onDelete: (id: string) => void;
};

export function SavedRouteRow({ route, isDeleting, onDelete }: Props) {
  const router = useRouter();

  return (
    <ReanimatedSwipeable
      friction={ROUTE_SWIPE_FRICTION}
      rightThreshold={ROUTE_SWIPE_THRESHOLD}
      overshootRight={false}
      renderRightActions={(_progress, _translation, swipeable) => (
        <RouteRowActions
          isDeleting={isDeleting}
          onEdit={() => {
            swipeable.close();
            router.push(HREFS.editRoute(route.id));
          }}
          onDelete={() => {
            swipeable.close();
            onDelete(route.id);
          }}
        />
      )}
    >
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
    </ReanimatedSwipeable>
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
    backgroundColor: colors.white,
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
