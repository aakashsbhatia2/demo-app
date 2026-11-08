import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { TextField } from "@/components/text-field";
import { MAX_ROUTE_NAME_LENGTH } from "@/constants/saved-routes";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import { useAsyncAction } from "@/hooks/use-async-action";
import { isFilled } from "@/utils/validation";

type Props = {
  visible: boolean;
  title?: string;
  initialName?: string;
  onCancel: () => void;
  onSave: (name: string) => Promise<void>;
};

export function SaveRouteDialog({
  visible,
  title = "Save route",
  initialName = "",
  onCancel,
  onSave,
}: Props) {
  const [name, setName] = useState(initialName);
  const { run, isRunning, error } = useAsyncAction(onSave);

  const canSave = isFilled(name) && !isRunning;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <TextField
            label="Route name"
            value={name}
            onChangeText={setName}
            placeholder="e.g. Morning loop"
            maxLength={MAX_ROUTE_NAME_LENGTH}
            autoFocus
          />
          <FormError message={error} />
          <View style={styles.buttons}>
            <Button
              label="Cancel"
              onPress={onCancel}
              disabled={isRunning}
              variant="secondary"
              style={styles.button}
            />
            <Button
              label={isRunning ? "Saving…" : "Save"}
              onPress={() => run(name.trim())}
              disabled={!canSave}
              variant="primary"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    paddingTop: "25%",
    paddingHorizontal: spacing.lg,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  card: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: "700",
    color: colors.text,
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  button: {
    flex: 1,
  },
});
