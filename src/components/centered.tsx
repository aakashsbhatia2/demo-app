import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { fontSize, spacing } from "@/constants/theme";

type Props = {
  message?: string;
  children?: ReactNode;
};

export function Centered({ message, children }: Props) {
  return (
    <View style={styles.centered}>
      {message ? <Text style={styles.message}>{message}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  message: {
    textAlign: "center",
    fontSize: fontSize.sm,
  },
});
