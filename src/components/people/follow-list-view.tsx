import { StyleSheet, View } from "react-native";

import { PeopleList } from "@/components/people/people-list";
import { ERROR_MESSAGES } from "@/constants/errors";
import { PEOPLE_MESSAGES } from "@/constants/people";
import { colors } from "@/constants/theme";
import { useFollowList, type FollowListKind } from "@/hooks/use-follow-list";
import { useFollowToggle } from "@/hooks/use-follow-toggle";

type Props = {
  kind: FollowListKind;
};

const EMPTY_MESSAGES: Record<FollowListKind, string> = {
  followers: PEOPLE_MESSAGES.noFollowers,
  following: PEOPLE_MESSAGES.noFollowing,
};

export function FollowListView({ kind }: Props) {
  const list = useFollowList(kind);
  const { pendingIds, toggleFollow } = useFollowToggle((user, isFollowing) =>
    list.setFollowing(user.id, isFollowing),
  );

  return (
    <View style={styles.container}>
      <PeopleList
        users={list.users}
        isLoading={list.isLoading}
        message={list.error ? ERROR_MESSAGES.peopleLoadFailed(list.error) : null}
        emptyMessage={EMPTY_MESSAGES[kind]}
        pendingIds={pendingIds}
        onToggleFollow={toggleFollow}
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
