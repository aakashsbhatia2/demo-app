import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { listFollowers, listFollowing } from "@/services/users";
import type { PublicUser } from "@/types/user";

export type FollowListKind = "followers" | "following";

const LOADERS: Record<FollowListKind, () => Promise<PublicUser[]>> = {
  followers: listFollowers,
  following: listFollowing,
};

export function useFollowList(kind: FollowListKind) {
  const [users, setUsers] = useState<PublicUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      LOADERS[kind]()
        .then((loaded) => {
          if (!isActive) return;
          setUsers(loaded);
          setError(null);
        })
        .catch((caught: Error) => {
          if (isActive) setError(caught.message);
        });

      return () => {
        isActive = false;
      };
    }, [kind]),
  );

  const setFollowing = (id: string, isFollowing: boolean) => {
    setUsers((current) =>
      current?.map((user) => (user.id === id ? { ...user, isFollowing } : user)) ?? current,
    );
  };

  return {
    users: users ?? [],
    isLoading: users === null && error === null,
    error,
    setFollowing,
  };
}
