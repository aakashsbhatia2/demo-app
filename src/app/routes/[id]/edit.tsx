import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

import { Centered } from "@/components/centered";
import { RouteEditor } from "@/components/saved-routes/route-editor";
import { ERROR_MESSAGES } from "@/constants/errors";
import { useSavedRoute } from "@/hooks/use-saved-route";

export default function EditRouteScreen() {
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

  return <RouteEditor key={route.id} initialRoute={route} />;
}
