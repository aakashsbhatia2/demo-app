import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { MemberList } from "@/components/group-runs/member-list";
import { GROUP_RUN_MESSAGES } from "@/constants/group-runs";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import type { GroupRun, MemberStatus } from "@/types/group-run";
import { formatDistance } from "@/utils/distance";

const MEMBER_LIST_MAX_HEIGHT = 180;

type Props = {
  groupRun: GroupRun;
  isHost: boolean;
  myStatus: MemberStatus | null;
  isBusy: boolean;
  error: string | null;
  onStart: () => void;
  onJoin: () => void;
  onDecline: () => void;
};

export function GroupRunLobbyPanel({
  groupRun,
  isHost,
  myStatus,
  isBusy,
  error,
  onStart,
  onJoin,
  onDecline,
}: Props) {
  const insets = useSafeAreaInsets();
  const isFinished = groupRun.status === "finished";
  const isInvited = !isFinished && myStatus !== "joined";
  const canStart = isHost && groupRun.status === "waiting";

  return (
    <View style={[styles.panel, { paddingBottom: insets.bottom + spacing.md }]}>
      <Text style={styles.heading}>{heading(groupRun, isHost, isInvited)}</Text>
      <Text style={styles.distance}>{formatDistance(groupRun.route.distanceMeters)}</Text>

      <ScrollView style={styles.members}>
        <MemberList members={groupRun.members} hostId={groupRun.hostId} />
      </ScrollView>

      <FormError message={error} />

      {isInvited ? (
        <View style={styles.buttons}>
          <Button label="Decline" onPress={onDecline} disabled={isBusy} style={styles.button} />
          <Button
            label={isBusy ? "Joining…" : "Join"}
            onPress={onJoin}
            disabled={isBusy}
            variant="primary"
            style={styles.button}
          />
        </View>
      ) : null}
      {canStart ? (
        <Button
          label={isBusy ? "Starting…" : "Start group run"}
          onPress={onStart}
          disabled={isBusy}
          variant="primary"
        />
      ) : null}
    </View>
  );
}

function heading(groupRun: GroupRun, isHost: boolean, isInvited: boolean) {
  if (groupRun.status === "finished") return GROUP_RUN_MESSAGES.ended;
  if (isInvited) return GROUP_RUN_MESSAGES.invited;
  if (isHost) return GROUP_RUN_MESSAGES.readyToStart;
  return GROUP_RUN_MESSAGES.waitingForHost;
}

const styles = StyleSheet.create({
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    gap: spacing.sm,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    boxShadow: "0 -2px 12px rgba(0, 0, 0, 0.12)",
  },
  heading: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.textMuted,
  },
  distance: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    color: colors.text,
  },
  members: {
    maxHeight: MEMBER_LIST_MAX_HEIGHT,
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  button: {
    flex: 1,
  },
});
