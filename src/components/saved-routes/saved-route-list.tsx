import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { Centered } from "@/components/centered";
import { SavedRouteRow } from "@/components/saved-routes/saved-route-row";
import { ERROR_MESSAGES } from "@/constants/errors";
import type { SavedRoute } from "@/types/saved-route";

type Props = {
  routes: SavedRoute[];
  isLoading: boolean;
  error: string | null;
  deletingId: string | null;
  onDelete: (id: string) => void;
};

export function SavedRouteList({ routes, isLoading, error, deletingId, onDelete }: Props) {
  if (routes.length === 0) {
    if (isLoading) {
      return (
        <Centered>
          <ActivityIndicator />
        </Centered>
      );
    }
    if (error) return <Centered message={ERROR_MESSAGES.routesLoadFailed(error)} />;
    return <Centered message="No routes yet. Create your first one below." />;
  }

  return (
    <FlatList
      data={routes}
      keyExtractor={(route) => route.id}
      renderItem={({ item }) => (
        <SavedRouteRow route={item} isDeleting={deletingId === item.id} onDelete={onDelete} />
      )}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
