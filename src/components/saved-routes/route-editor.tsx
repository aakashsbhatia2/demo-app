import { StyleSheet, View } from "react-native";

import { RouteMap } from "@/components/route-map";
import { RoutePanel } from "@/components/route-panel";
import { SaveRouteDialog } from "@/components/saved-routes/save-route-dialog";
import { useRouteEditor } from "@/hooks/use-route-editor";
import type { SavedRoute } from "@/types/saved-route";

type Props = {
  initialRoute?: SavedRoute;
};

export function RouteEditor({ initialRoute }: Props) {
  const editor = useRouteEditor(initialRoute);
  const saveLabel = editor.isEditing ? "Save changes" : "Save route";

  return (
    <View style={styles.container}>
      <RouteMap
        waypoints={editor.waypoints}
        path={editor.path}
        center={initialRoute?.points[0]}
        onMapPress={editor.addPoint}
      />
      <RoutePanel
        distance={editor.distance}
        pointCount={editor.waypoints.length}
        isLoop={editor.isLoop}
        canUndo={editor.canUndo}
        canCloseLoop={editor.canCloseLoop}
        canSave={editor.canSave}
        saveLabel={saveLabel}
        onUndo={editor.undo}
        onCloseLoop={editor.closeLoop}
        onClear={editor.clear}
        onSave={editor.openSaveDialog}
      />
      <SaveRouteDialog
        visible={editor.isSaveDialogOpen}
        title={saveLabel}
        initialName={editor.initialName}
        onCancel={editor.closeSaveDialog}
        onSave={editor.save}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
