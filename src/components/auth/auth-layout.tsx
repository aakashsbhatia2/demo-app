import type { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { colors, fontSize, spacing } from "@/constants/theme";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function AuthLayout({ title, subtitle, children }: Props) {
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      bottomOffset={spacing.lg}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
});
