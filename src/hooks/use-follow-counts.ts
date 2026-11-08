import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

import { listFollowers, listFollowing } from "@/services/users";

type FollowCounts = {
  followers: number;
  following: number;
};

export function useFollowCounts() {
  const [counts, setCounts] = useState<FollowCounts | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      Promise.all([listFollowers(), listFollowing()])
        .then(([followers, following]) => {
          if (isActive) setCounts({ followers: followers.length, following: following.length });
        })
        .catch(() => {});

      return () => {
        isActive = false;
      };
    }, []),
  );

  return counts;
}
