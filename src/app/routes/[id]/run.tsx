import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

import { Centered } from "@/components/centered";
import { RunView } from "@/components/run/run-view";
import { ERROR_MESSAGES } from "@/constants/errors";
import { useSavedRoute } from "@/hooks/use-saved-route";

export default function RunRouteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { route, error, isLoading } = useSavedRoute(id);

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
    <>
      <Stack.Screen options={{ title: route.name }} />
      <RunView key={route.id} route={route} />
    </>
  );
}
