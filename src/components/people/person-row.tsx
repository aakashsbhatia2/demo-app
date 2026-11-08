import { StyleSheet, Text, View } from "react-native";

import { FollowButton } from "@/components/people/follow-button";
import { colors, fontSize, spacing } from "@/constants/theme";
import type { PublicUser } from "@/types/user";

type Props = {
  user: PublicUser;
  isPending: boolean;
  onToggleFollow: (user: PublicUser) => void;
};

export function PersonRow({ user, isPending, onToggleFollow }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.main}>
        <Text style={styles.name} numberOfLines={1}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.username} numberOfLines={1}>
          @{user.username}
        </Text>
      </View>
      <FollowButton
        isFollowing={user.isFollowing}
        isPending={isPending}
        onPress={() => onToggleFollow(user)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  main: {
    flex: 1,
    gap: spacing.xxs,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
  },
  username: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
});
