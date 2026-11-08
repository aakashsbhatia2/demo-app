import { useEffect, useEffectEvent, useRef } from "react";

import type { GroupRunStatus } from "@/types/group-run";
import type { RunStatus } from "@/types/run";

type Session = {
  status: RunStatus;
  begin: () => void;
  finish: () => void;
};

export function useGroupRunSync(groupStatus: GroupRunStatus, isJoined: boolean, session: Session) {
  const hasAutoStarted = useRef(false);
  const shouldStart = groupStatus === "running" && isJoined && session.status === "idle";
  const shouldFinish =
    groupStatus === "finished" && (session.status === "running" || session.status === "paused");

  const begin = useEffectEvent(() => session.begin());
  const finish = useEffectEvent(() => session.finish());

  useEffect(() => {
    if (!shouldStart || hasAutoStarted.current) return;
    hasAutoStarted.current = true;
    begin();
  }, [shouldStart]);

  useEffect(() => {
    if (shouldFinish) finish();
  }, [shouldFinish]);
}
