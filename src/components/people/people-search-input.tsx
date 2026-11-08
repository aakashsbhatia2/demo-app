import { StyleSheet, TextInput } from "react-native";

import { SEARCH_PLACEHOLDER } from "@/constants/people";
import { colors, fontSize, radius, spacing } from "@/constants/theme";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export function PeopleSearchInput({ value, onChangeText }: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={SEARCH_PLACEHOLDER}
      placeholderTextColor={colors.textMuted}
      autoFocus
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="search"
      clearButtonMode="while-editing"
      accessibilityLabel={SEARCH_PLACEHOLDER}
      style={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
