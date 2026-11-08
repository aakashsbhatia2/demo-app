import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";

import { colors, fontSize, radius, spacing } from "@/constants/theme";

type Variant = "primary" | "secondary" | "danger";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, disabled, variant = "secondary", style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        buttonStyles[variant],
        disabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, textStyles[variant]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  disabled: {
    opacity: 0.4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: fontSize.md,
    fontWeight: "600",
  },
});

const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surfaceMuted,
  },
  danger: {
    backgroundColor: colors.surfaceMuted,
  },
});

const textStyles = StyleSheet.create({
  primary: {
    color: colors.white,
  },
  secondary: {
    color: colors.text,
  },
  danger: {
    color: colors.error,
  },
});
