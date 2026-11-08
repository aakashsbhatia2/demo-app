import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Centered } from "@/components/centered";
import { GroupRunContent } from "@/components/group-runs/group-run-content";
import { ERROR_MESSAGES } from "@/constants/errors";
import { useGroupRun } from "@/hooks/use-group-run";
import { useSession } from "@/hooks/use-session";

type Props = {
  id: string;
};

export function GroupRunView({ id }: Props) {
  const { user } = useSession();
  const { groupRun, setGroupRun, positions, error, liveError, isLoading } = useGroupRun(id);

  if (isLoading) {
    return (
      <Centered>
        <ActivityIndicator />
      </Centered>
    );
  }

  if (!groupRun || !user) {
    return <Centered message={ERROR_MESSAGES.groupRunLoadFailed(error)} />;
  }

  return (
    <View style={styles.container}>
      <GroupRunContent
        groupRun={groupRun}
        positions={positions}
        meId={user.id}
        liveError={liveError}
        onUpdated={setGroupRun}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
