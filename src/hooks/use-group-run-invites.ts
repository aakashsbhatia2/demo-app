import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { declineGroupRun, listInvites } from "@/services/group-runs";
import type { GroupRunInvite } from "@/types/group-run";

export function useGroupRunInvites() {
  const [invites, setInvites] = useState<GroupRunInvite[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      listInvites()
        .then((loaded) => {
          if (!isActive) return;
          setInvites(loaded);
          setError(null);
        })
        .catch((caught: Error) => {
          if (isActive) setError(caught.message);
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  const decline = async (id: string) => {
    await declineGroupRun(id);
    setInvites((current) => current?.filter((invite) => invite.id !== id) ?? current);
  };

  return {
    invites: invites ?? [],
    isLoading: invites === null && error === null,
    error,
    decline,
  };
}
