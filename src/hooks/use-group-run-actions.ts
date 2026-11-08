import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { ERROR_MESSAGES } from "@/constants/errors";
import {
  declineGroupRun,
  endGroupRun,
  joinGroupRun,
  startGroupRun,
} from "@/services/group-runs";
import type { GroupRun } from "@/types/group-run";

export function useGroupRunActions(id: string, onUpdated: (groupRun: GroupRun) => void) {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const perform = (action: () => Promise<void>) => async () => {
    setIsBusy(true);
    setError(null);
    try {
      await action();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : ERROR_MESSAGES.groupRunActionFailed);
    } finally {
      setIsBusy(false);
    }
  };

  const end = perform(async () => onUpdated(await endGroupRun(id)));

  const confirmEnd = () => {
    Alert.alert("End group run?", "Everyone's run will finish.", [
      { text: "Cancel", style: "cancel" },
      { text: "End", style: "destructive", onPress: end },
    ]);
  };

  return {
    isBusy,
    error,
    start: perform(async () => onUpdated(await startGroupRun(id))),
    join: perform(async () => onUpdated(await joinGroupRun(id))),
    decline: perform(async () => {
      await declineGroupRun(id);
      router.back();
    }),
    confirmEnd,
  };
}
