import { Stack } from "expo-router";

import { GroupRunLobbyPanel } from "@/components/group-runs/group-run-lobby-panel";
import { RunnerBoard } from "@/components/group-runs/runner-board";
import { RouteMap } from "@/components/route-map";
import { LocationPermissionDialog } from "@/components/run/location-permission-dialog";
import { RunPanel } from "@/components/run/run-panel";
import { useGroupRunActions } from "@/hooks/use-group-run-actions";
import { useGroupRunSync } from "@/hooks/use-group-run-sync";
import { useNow } from "@/hooks/use-now";
import { useRunSession } from "@/hooks/use-run-session";
import type { GroupRun, RunnerPosition } from "@/types/group-run";
import { toRunners } from "@/utils/group-run";

type Props = {
  groupRun: GroupRun;
  positions: Record<string, RunnerPosition>;
  meId: string;
  liveError: string | null;
  onUpdated: (groupRun: GroupRun) => void;
};

export function GroupRunContent({ groupRun, positions, meId, liveError, onUpdated }: Props) {
  const session = useRunSession(groupRun.route, groupRun.id);
  const actions = useGroupRunActions(groupRun.id, onUpdated);
  const myStatus = groupRun.members.find((member) => member.id === meId)?.status ?? null;
  const isJoined = myStatus === "joined";
  const isHost = groupRun.hostId === meId;
  const isTracking = session.status === "running" || session.status === "paused";
  const now = useNow(groupRun.status === "running");

  useGroupRunSync(groupRun.status, isJoined, session);

  const { mapRunners, board } = toRunners({
    members: groupRun.members,
    positions,
    meId,
    myDistanceMeters: session.stats.distanceMeters,
    now,
  });
  const showRunPanel = isJoined && (groupRun.status === "running" || session.status !== "idle");

  return (
    <>
      <Stack.Screen options={{ title: groupRun.route.name }} />
      <RouteMap
        waypoints={groupRun.route.points}
        path={groupRun.route.path}
        center={groupRun.route.points[0]}
        trail={session.trail}
        runners={mapRunners}
        followUser={isTracking}
      />
      {groupRun.status !== "waiting" ? (
        <RunnerBoard
          rows={board}
          canEnd={isHost && groupRun.status === "running"}
          onEnd={actions.confirmEnd}
        />
      ) : null}
      {showRunPanel ? (
        <RunPanel
          status={session.status}
          stats={session.stats}
          isBusy={session.isBusy}
          error={session.error ?? actions.error ?? liveError}
          onStart={session.begin}
          onPause={session.pause}
          onResume={session.resume}
          onFinish={session.finish}
          onSave={session.save}
          onDiscard={session.discard}
        />
      ) : (
        <GroupRunLobbyPanel
          groupRun={groupRun}
          isHost={isHost}
          myStatus={myStatus}
          isBusy={actions.isBusy}
          error={actions.error ?? liveError}
          onStart={actions.start}
          onJoin={actions.join}
          onDecline={actions.decline}
        />
      )}
      <LocationPermissionDialog
        step={session.permissionStep}
        onContinue={session.requestPermission}
        onClose={session.closePermission}
      />
    </>
  );
}
