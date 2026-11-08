import { useRouter, usePreventRemove } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

import { MIN_SAVE_POINTS } from "@/constants/saved-routes";
import { useRouteBuilder } from "@/hooks/use-route-builder";
import { saveRoute, updateRoute } from "@/services/routes";
import type { SavedRoute, SaveRouteInput } from "@/types/saved-route";

export function useRouteEditor(initialRoute?: SavedRoute) {
  const router = useRouter();
  const builder = useRouteBuilder(initialRoute);
  const [hasEdits, setHasEdits] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  const isEditing = initialRoute !== undefined;
  const hasUnsavedChanges =
    hasEdits && !isSaved && (isEditing || builder.waypoints.length > 0);

  const disablePrevention = usePreventRemove(hasUnsavedChanges, ({ repeat }) => {
    Alert.alert(
      isEditing ? "Discard changes?" : "Discard this route?",
      isEditing ? "Your changes will be lost." : "Your points will be lost.",
      [
        { text: "Keep editing", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => {
            setHasEdits(false);
            repeat();
          },
        },
      ],
    );
  });

  const trackEdit =
    <TArgs extends unknown[]>(action: (...args: TArgs) => void) =>
    (...args: TArgs) => {
      setHasEdits(true);
      action(...args);
    };

  const save = async (name: string) => {
    const input: SaveRouteInput = { name, points: builder.waypoints, isLoop: builder.isLoop };
    if (initialRoute) {
      await updateRoute(initialRoute.id, input);
    } else {
      await saveRoute(input);
    }
    setIsSaved(true);
    setIsSaveDialogOpen(false);
    disablePrevention();
    router.back();
  };

  return {
    ...builder,
    addPoint: trackEdit(builder.addPoint),
    undo: trackEdit(builder.undo),
    closeLoop: trackEdit(builder.closeLoop),
    clear: trackEdit(builder.clear),
    isEditing,
    initialName: initialRoute?.name ?? "",
    canSave: builder.waypoints.length >= MIN_SAVE_POINTS,
    isSaveDialogOpen,
    openSaveDialog: () => setIsSaveDialogOpen(true),
    closeSaveDialog: () => setIsSaveDialogOpen(false),
    save,
  };
}
