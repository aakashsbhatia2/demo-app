import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { Centered } from "@/components/centered";
import { RunRow } from "@/components/runs/run-row";
import { ERROR_MESSAGES } from "@/constants/errors";
import type { SavedRunSummary } from "@/types/saved-run";

type Props = {
  runs: SavedRunSummary[];
  isLoading: boolean;
  error: string | null;
};

const EMPTY_MESSAGE = "No runs yet. Open a route and tap Start run.";

export function RunList({ runs, isLoading, error }: Props) {
  if (runs.length === 0) {
    if (isLoading) {
      return (
        <Centered>
          <ActivityIndicator />
        </Centered>
      );
    }
    if (error) return <Centered message={ERROR_MESSAGES.runsLoadFailed(error)} />;
    return <Centered message={EMPTY_MESSAGE} />;
  }

  return (
    <FlatList
      data={runs}
      keyExtractor={(run) => run.id}
      renderItem={({ item }) => <RunRow run={item} />}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
