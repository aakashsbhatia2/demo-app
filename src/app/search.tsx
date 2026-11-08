import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import { Centered } from "@/components/centered";
import { PeopleList } from "@/components/people/people-list";
import { PeopleSearchInput } from "@/components/people/people-search-input";
import { ERROR_MESSAGES } from "@/constants/errors";
import { PEOPLE_MESSAGES } from "@/constants/people";
import { colors } from "@/constants/theme";
import { useFollowToggle } from "@/hooks/use-follow-toggle";
import { useUserSearch } from "@/hooks/use-user-search";

export default function SearchScreen() {
  const search = useUserSearch();
  const { pendingIds, toggleFollow } = useFollowToggle((user, isFollowing) =>
    search.setFollowing(user.id, isFollowing),
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <PeopleSearchInput value={search.query} onChangeText={search.setQuery} />
          ),
        }}
      />
      {search.isSearching ? (
        <PeopleList
          users={search.results}
          isLoading={search.status === "searching"}
          message={search.status === "error" ? ERROR_MESSAGES.searchFailed : null}
          emptyMessage={PEOPLE_MESSAGES.noResults(search.query.trim())}
          pendingIds={pendingIds}
          onToggleFollow={toggleFollow}
        />
      ) : (
        <Centered message={PEOPLE_MESSAGES.searchHint} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
