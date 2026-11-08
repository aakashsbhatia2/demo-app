import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { Centered } from "@/components/centered";
import { InviteRow } from "@/components/group-runs/invite-row";
import { ERROR_MESSAGES } from "@/constants/errors";
import { GROUP_RUN_MESSAGES } from "@/constants/group-runs";
import type { GroupRunInvite } from "@/types/group-run";

type Props = {
  invites: GroupRunInvite[];
  isLoading: boolean;
  error: string | null;
  pendingId: string | null;
  onJoin: (id: string) => void;
  onDecline: (id: string) => void;
};

export function InviteList({ invites, isLoading, error, pendingId, onJoin, onDecline }: Props) {
  if (error) return <Centered message={ERROR_MESSAGES.invitesLoadFailed(error)} />;

  if (invites.length === 0) {
    if (isLoading) {
      return (
        <Centered>
          <ActivityIndicator />
        </Centered>
      );
    }
    return <Centered message={GROUP_RUN_MESSAGES.noInvites} />;
  }

  return (
    <FlatList
      data={invites}
      keyExtractor={(invite) => invite.id}
      renderItem={({ item }) => (
        <InviteRow
          invite={item}
          isPending={pendingId === item.id}
          onJoin={onJoin}
          onDecline={onDecline}
        />
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
