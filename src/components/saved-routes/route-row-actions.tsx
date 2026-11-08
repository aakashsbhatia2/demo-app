import { Pressable, StyleSheet, Text, View } from "react-native";

import { ROUTE_ACTION_WIDTH } from "@/constants/saved-routes";
import { colors, fontSize } from "@/constants/theme";

type Props = {
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export function RouteRowActions({ isDeleting, onEdit, onDelete }: Props) {
  return (
    <View style={styles.actions}>
      <Pressable
        onPress={onEdit}
        disabled={isDeleting}
        accessibilityRole="button"
        style={[styles.action, styles.edit]}
      >
        <Text style={styles.label}>Edit</Text>
      </Pressable>
      <Pressable
        onPress={onDelete}
        disabled={isDeleting}
        accessibilityRole="button"
        style={[styles.action, styles.delete]}
      >
        <Text style={styles.label}>{isDeleting ? "Deleting…" : "Delete"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
  },
  action: {
    width: ROUTE_ACTION_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  edit: {
    backgroundColor: colors.textMuted,
  },
  delete: {
    backgroundColor: colors.error,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.white,
  },
});
