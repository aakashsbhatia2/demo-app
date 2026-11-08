import { StyleSheet, View } from "react-native";

import { RouteMap } from "@/components/route-map";
import { LocationPermissionDialog } from "@/components/run/location-permission-dialog";
import { RunPanel } from "@/components/run/run-panel";
import { useRunSession } from "@/hooks/use-run-session";
import type { SavedRoute } from "@/types/saved-route";

type Props = {
  route: SavedRoute;
};

export function RunView({ route }: Props) {
  const session = useRunSession(route);

  return (
    <View style={styles.container}>
      <RouteMap
        waypoints={route.points}
        path={route.path}
        center={route.points[0]}
        trail={session.trail}
        followLocation={session.currentLocation}
      />
      <RunPanel
        status={session.status}
        stats={session.stats}
        isBusy={session.isBusy}
        error={session.error}
        onStart={session.begin}
        onPause={session.pause}
        onResume={session.resume}
        onFinish={session.finish}
        onSave={session.save}
        onDiscard={session.discard}
      />
      <LocationPermissionDialog
        step={session.permissionStep}
        onContinue={session.requestPermission}
        onClose={session.closePermission}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
