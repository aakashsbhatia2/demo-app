import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { Centered } from "@/components/centered";
import { PersonRow } from "@/components/people/person-row";
import type { PublicUser } from "@/types/user";

type Props = {
  users: PublicUser[];
  isLoading: boolean;
  message: string | null;
  emptyMessage: string;
  pendingIds: ReadonlySet<string>;
  onToggleFollow: (user: PublicUser) => void;
};

export function PeopleList({
  users,
  isLoading,
  message,
  emptyMessage,
  pendingIds,
  onToggleFollow,
}: Props) {
  if (message) return <Centered message={message} />;

  if (users.length === 0) {
    if (isLoading) {
      return (
        <Centered>
          <ActivityIndicator />
        </Centered>
      );
    }
    return <Centered message={emptyMessage} />;
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(user) => user.id}
      renderItem={({ item }) => (
        <PersonRow
          user={item}
          isPending={pendingIds.has(item.id)}
          onToggleFollow={onToggleFollow}
        />
      )}
      keyboardShouldPersistTaps="handled"
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
