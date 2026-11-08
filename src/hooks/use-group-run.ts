import { useEffect, useState } from "react";

import { ERROR_MESSAGES } from "@/constants/errors";
import { LIVE_EVENTS } from "@/constants/group-runs";
import { getGroupRun } from "@/services/group-runs";
import { openLiveConnection } from "@/services/live-connection";
import type {
  GroupRun,
  GroupRunMember,
  LiveJoinReply,
  RunnerPosition,
} from "@/types/group-run";

type Positions = Record<string, RunnerPosition>;

export function useGroupRun(id: string) {
  const [groupRun, setGroupRun] = useState<GroupRun | null>(null);
  const [positions, setPositions] = useState<Positions>({});
  const [error, setError] = useState<string | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    getGroupRun(id)
      .then((loaded) => {
        if (isActive) setGroupRun(loaded);
      })
      .catch((caught: Error) => {
        if (isActive) setError(caught.message);
      });

    const socket = openLiveConnection();

    socket.on("connect", () => {
      socket.emit(LIVE_EVENTS.joinGroupRun, id, (reply: LiveJoinReply) => {
        if (!isActive) return;
        if (!reply.groupRun) {
          setLiveError(ERROR_MESSAGES.liveConnectionFailed);
          return;
        }
        setLiveError(null);
        setGroupRun(reply.groupRun);
      });
    });
    socket.on("connect_error", () => setLiveError(ERROR_MESSAGES.liveConnectionFailed));
    socket.on(LIVE_EVENTS.membersChanged, (members: GroupRunMember[]) =>
      setGroupRun((current) => (current ? { ...current, members } : current)),
    );
    socket.on(LIVE_EVENTS.started, (updated: GroupRun) => setGroupRun(updated));
    socket.on(LIVE_EVENTS.ended, (updated: GroupRun) => setGroupRun(updated));
    socket.on(LIVE_EVENTS.runnerMoved, (position: RunnerPosition) =>
      setPositions((current) => ({ ...current, [position.userId]: position })),
    );

    return () => {
      isActive = false;
      socket.emit(LIVE_EVENTS.leaveGroupRun, id);
      socket.disconnect();
    };
  }, [id]);

  return {
    groupRun,
    setGroupRun,
    positions,
    error,
    liveError,
    isLoading: groupRun === null && error === null,
  };
}
