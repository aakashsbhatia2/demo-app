import { Linking, Modal, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/button";
import { ERROR_MESSAGES } from "@/constants/errors";
import { colors, fontSize, radius, spacing } from "@/constants/theme";
import type { PermissionStep } from "@/hooks/use-run-session";

type Props = {
  step: PermissionStep;
  onContinue: () => void;
  onClose: () => void;
};

export function LocationPermissionDialog({ step, onContinue, onClose }: Props) {
  const isExplaining = step === "explain";
  const message = isExplaining
    ? 'To track your run with the screen off, choose "Allow all the time" on the next screen.'
    : step === "location-denied"
      ? ERROR_MESSAGES.locationDenied
      : ERROR_MESSAGES.backgroundLocationDenied;

  return (
    <Modal visible={step !== "hidden"} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Location for runs</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <Button label="Not now" onPress={onClose} style={styles.button} />
            {isExplaining ? (
              <Button label="Continue" onPress={onContinue} variant="primary" style={styles.button} />
            ) : (
              <Button
                label="Open Settings"
                onPress={() => Linking.openSettings()}
                variant="primary"
                style={styles.button}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
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
  message: {
    fontSize: fontSize.sm,
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
