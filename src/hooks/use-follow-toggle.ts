import { useState } from "react";
import { Alert } from "react-native";

import { ERROR_MESSAGES } from "@/constants/errors";
import { followUser, unfollowUser } from "@/services/users";
import type { PublicUser } from "@/types/user";

export function useFollowToggle(onChanged: (user: PublicUser, isFollowing: boolean) => void) {
  const [pendingIds, setPendingIds] = useState<ReadonlySet<string>>(new Set());

  const setPending = (id: string, isPending: boolean) => {
    setPendingIds((current) => {
      const next = new Set(current);
      if (isPending) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const toggleFollow = async (user: PublicUser) => {
    const shouldFollow = !user.isFollowing;
    setPending(user.id, true);
    try {
      if (shouldFollow) await followUser(user.id);
      else await unfollowUser(user.id);
      onChanged(user, shouldFollow);
    } catch (error) {
      Alert.alert(
        ERROR_MESSAGES.followFailed,
        error instanceof Error ? error.message : ERROR_MESSAGES.generic,
      );
    } finally {
      setPending(user.id, false);
    }
  };

  return { pendingIds, toggleFollow };
}
