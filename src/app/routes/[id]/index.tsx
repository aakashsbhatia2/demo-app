import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Centered } from "@/components/centered";
import { RouteMap } from "@/components/route-map";
import { RouteDetailPanel } from "@/components/saved-routes/route-detail-panel";
import { ERROR_MESSAGES } from "@/constants/errors";
import { HREFS } from "@/constants/routes";
import { useDeleteRoute } from "@/hooks/use-delete-route";
import { useSavedRoute } from "@/hooks/use-saved-route";

export default function RouteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { route, error, isLoading } = useSavedRoute(id);
  const { confirmDelete, isDeleting } = useDeleteRoute(id);

  if (isLoading) {
    return (
      <Centered>
        <ActivityIndicator />
      </Centered>
    );
  }

  if (!route) {
    return <Centered message={ERROR_MESSAGES.routeLoadFailed(error)} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: route.name }} />
      <RouteMap waypoints={route.points} path={route.path} center={route.points[0]} />
      <RouteDetailPanel
        route={route}
        isDeleting={isDeleting}
        onStartRun={() => router.push(HREFS.runRoute(route.id))}
        onEdit={() => router.push(HREFS.editRoute(route.id))}
        onDelete={confirmDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
