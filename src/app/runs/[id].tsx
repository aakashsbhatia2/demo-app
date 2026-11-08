import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Centered } from "@/components/centered";
import { RouteMap } from "@/components/route-map";
import { RunDetailPanel } from "@/components/runs/run-detail-panel";
import { ERROR_MESSAGES } from "@/constants/errors";
import { useSavedRun } from "@/hooks/use-saved-run";

const DELETED_ROUTE_TITLE = "Run";

export default function RunDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { run, route, error, isLoading } = useSavedRun(id);

  if (isLoading) {
    return (
      <Centered>
        <ActivityIndicator />
      </Centered>
    );
  }

  if (!run) {
    return <Centered message={ERROR_MESSAGES.runLoadFailed(error)} />;
  }

  const center = run.track[0]?.[0] ?? route?.points[0];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: run.routeName ?? DELETED_ROUTE_TITLE }} />
      <RouteMap
        waypoints={route?.points ?? []}
        path={route?.path ?? []}
        trail={run.track}
        center={center}
      />
      <RunDetailPanel run={run} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
