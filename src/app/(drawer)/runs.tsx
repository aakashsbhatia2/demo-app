import { StyleSheet, View } from "react-native";

import { RunList } from "@/components/runs/run-list";
import { colors } from "@/constants/theme";
import { useMyRuns } from "@/hooks/use-my-runs";

export default function MyRunsScreen() {
  const { runs, isLoading, error } = useMyRuns();

  return (
    <View style={styles.container}>
      <RunList runs={runs} isLoading={isLoading} error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
