import { useRouter } from "expo-router";
import { useState } from "react";

import { ERROR_MESSAGES } from "@/constants/errors";
import { MAX_GROUP_RUN_INVITES } from "@/constants/group-runs";
import { HREFS } from "@/constants/routes";
import { createGroupRun } from "@/services/group-runs";

export function useCreateGroupRun(routeId: string) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set());
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else if (next.size < MAX_GROUP_RUN_INVITES) next.add(id);
      return next;
    });
  };

  const create = async () => {
    setIsCreating(true);
    setError(null);
    try {
      const groupRun = await createGroupRun({ routeId, inviteeIds: [...selectedIds] });
      router.replace(HREFS.groupRun(groupRun.id));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : ERROR_MESSAGES.groupRunCreateFailed);
      setIsCreating(false);
    }
  };

  return { selectedIds, toggle, create, isCreating, error };
}
