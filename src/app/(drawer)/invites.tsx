import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { InviteList } from "@/components/group-runs/invite-list";
import { ERROR_MESSAGES } from "@/constants/errors";
import { HREFS } from "@/constants/routes";
import { colors } from "@/constants/theme";
import { useGroupRunInvites } from "@/hooks/use-group-run-invites";
import { joinGroupRun } from "@/services/group-runs";

export default function InvitesScreen() {
  const router = useRouter();
  const { invites, isLoading, error, decline } = useGroupRunInvites();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const respond = (action: (id: string) => Promise<void>) => async (id: string) => {
    setPendingId(id);
    try {
      await action(id);
    } catch (caught) {
      Alert.alert(
        ERROR_MESSAGES.groupRunActionFailed,
        caught instanceof Error ? caught.message : ERROR_MESSAGES.generic,
      );
    } finally {
      setPendingId(null);
    }
  };

  const join = respond(async (id) => {
    await joinGroupRun(id);
    router.push(HREFS.groupRun(id));
  });

  return (
    <View style={styles.container}>
      <InviteList
        invites={invites}
        isLoading={isLoading}
        error={error}
        pendingId={pendingId}
        onJoin={join}
        onDecline={respond(decline)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
