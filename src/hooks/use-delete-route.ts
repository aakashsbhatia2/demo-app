import { useState } from "react";
import { Alert } from "react-native";

import { ERROR_MESSAGES } from "@/constants/errors";
import { deleteRoute } from "@/services/routes";

export function useDeleteRoute(onDeleted: (id: string) => void) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const runDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteRoute(id);
      onDeleted(id);
    } catch (error) {
      Alert.alert(
        ERROR_MESSAGES.routeDeleteFailed,
        error instanceof Error ? error.message : ERROR_MESSAGES.generic,
      );
    } finally {
      setDeletingId(null);
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert("Delete this route?", "This can't be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => runDelete(id) },
    ]);
  };

  return { confirmDelete, deletingId };
}
