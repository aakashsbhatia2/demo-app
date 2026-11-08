import { StyleSheet, Text, View } from "react-native";

import { FollowCounts } from "@/components/profile/follow-counts";
import { colors, fontSize, spacing } from "@/constants/theme";
import type { AuthUser } from "@/types/auth";

type Props = {
  user: AuthUser;
};

export function ProfileDetails({ user }: Props) {
  return (
    <View style={styles.container}>
      <ProfileRow label="Name" value={`${user.firstName} ${user.lastName}`} />
      <ProfileRow label="Username" value={`@${user.username}`} />
      <ProfileRow label="Email" value={user.email} />
      <FollowCounts />
    </View>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  row: {
    gap: spacing.xxs,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textTransform: "uppercase",
  },
  value: {
    fontSize: fontSize.md,
    color: colors.text,
  },
});
