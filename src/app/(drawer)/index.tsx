import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CreateRouteButton } from "@/components/saved-routes/create-route-button";
import { SavedRouteList } from "@/components/saved-routes/saved-route-list";
import { colors, spacing } from "@/constants/theme";
import { useDeleteRoute } from "@/hooks/use-delete-route";
import { useMyRoutes } from "@/hooks/use-my-routes";

export default function MyRoutesScreen() {
  const insets = useSafeAreaInsets();
  const { routes, isLoading, error, removeRoute } = useMyRoutes();
  const { confirmDelete, deletingId } = useDeleteRoute(removeRoute);

  return (
    <View style={styles.container}>
      <SavedRouteList
        routes={routes}
        isLoading={isLoading}
        error={error}
        deletingId={deletingId}
        onDelete={confirmDelete}
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <CreateRouteButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  footer: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
