import { StyleSheet, Text, View } from "react-native";

import { MEMBER_STATUS_LABELS } from "@/constants/group-runs";
import { colors, fontSize, spacing } from "@/constants/theme";
import type { GroupRunMember } from "@/types/group-run";
import { fullName } from "@/utils/group-run";

const HOST_LABEL = "Host";

type Props = {
  members: GroupRunMember[];
  hostId: string;
};

export function MemberList({ members, hostId }: Props) {
  return (
    <View style={styles.list}>
      {members.map((member) => (
        <View key={member.id} style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {fullName(member)}
          </Text>
          <Text style={[styles.status, member.status === "joined" && styles.joined]}>
            {member.id === hostId ? HOST_LABEL : MEMBER_STATUS_LABELS[member.status]}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.xs,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  name: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
  status: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  joined: {
    color: colors.primary,
    fontWeight: "600",
  },
});
