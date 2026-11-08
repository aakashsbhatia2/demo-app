import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/button";
import { GROUP_RUN_MESSAGES } from "@/constants/group-runs";
import { colors, fontSize, spacing } from "@/constants/theme";
import type { GroupRunInvite } from "@/types/group-run";
import { formatDistance } from "@/utils/distance";
import { fullName } from "@/utils/group-run";

type Props = {
  invite: GroupRunInvite;
  isPending: boolean;
  onJoin: (id: string) => void;
  onDecline: (id: string) => void;
};

export function InviteRow({ invite, isPending, onJoin, onDecline }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.route} numberOfLines={1}>
        {invite.routeName}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {formatDistance(invite.distanceMeters)} · {GROUP_RUN_MESSAGES.invitedBy(fullName(invite.host))}
      </Text>
      <View style={styles.buttons}>
        <Button
          label="Decline"
          onPress={() => onDecline(invite.id)}
          disabled={isPending}
          style={styles.button}
        />
        <Button
          label="Join"
          onPress={() => onJoin(invite.id)}
          disabled={isPending}
          variant="primary"
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.xxs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  route: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
  },
  meta: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  button: {
    flex: 1,
  },
});
