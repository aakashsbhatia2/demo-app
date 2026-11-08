import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { Centered } from "@/components/centered";
import { FormError } from "@/components/form-error";
import { InviteeRow } from "@/components/group-runs/invitee-row";
import { ERROR_MESSAGES } from "@/constants/errors";
import { GROUP_RUN_MESSAGES, MAX_GROUP_RUN_INVITES } from "@/constants/group-runs";
import { colors, fontSize, spacing } from "@/constants/theme";
import { useCreateGroupRun } from "@/hooks/use-create-group-run";
import { useFollowList } from "@/hooks/use-follow-list";

type Props = {
  routeId: string;
};

export function InviteePicker({ routeId }: Props) {
  const insets = useSafeAreaInsets();
  const { users, isLoading, error: loadError } = useFollowList("following");
  const { selectedIds, toggle, create, isCreating, error } = useCreateGroupRun(routeId);

  if (loadError) return <Centered message={ERROR_MESSAGES.peopleLoadFailed(loadError)} />;

  if (users.length === 0) {
    if (isLoading) {
      return (
        <Centered>
          <ActivityIndicator />
        </Centered>
      );
    }
    return <Centered message={GROUP_RUN_MESSAGES.noFollowing} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>{GROUP_RUN_MESSAGES.pickHint(MAX_GROUP_RUN_INVITES)}</Text>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <InviteeRow user={item} isSelected={selectedIds.has(item.id)} onToggle={toggle} />
        )}
        style={styles.list}
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <FormError message={error} />
        <Button
          label={isCreating ? "Creating…" : `Create group run (${selectedIds.size})`}
          onPress={create}
          disabled={isCreating || selectedIds.size === 0}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  hint: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    padding: spacing.md,
  },
  list: {
    flex: 1,
  },
  footer: {
    gap: spacing.xs,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
