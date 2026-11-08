import { StyleSheet, Text, TextInput, View, type TextInputProps } from "react-native";

import { FormError } from "@/components/form-error";
import { colors, fontSize, radius, spacing } from "@/constants/theme";

type Props = TextInputProps & {
  label: string;
  error?: string | null;
};

export function TextField({ label, error, style, ...inputProps }: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor={colors.textMuted}
        accessibilityLabel={label}
        {...inputProps}
      />
      <FormError message={error ?? null} />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: spacing.xs,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.error,
  },
});
