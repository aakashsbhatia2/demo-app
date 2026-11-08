import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { ERROR_MESSAGES } from "@/constants/errors";
import { deleteRoute } from "@/services/routes";

export function useDeleteRoute(id: string) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const runDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteRoute(id);
      router.back();
    } catch (error) {
      setIsDeleting(false);
      Alert.alert(
        ERROR_MESSAGES.routeDeleteFailed,
        error instanceof Error ? error.message : ERROR_MESSAGES.generic,
      );
    }
  };

  const confirmDelete = () => {
    Alert.alert("Delete this route?", "This can't be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: runDelete },
    ]);
  };

  return { confirmDelete, isDeleting };
}
