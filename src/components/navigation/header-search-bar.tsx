import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, useWindowDimensions } from "react-native";

import { SEARCH_PLACEHOLDER } from "@/constants/people";
import { HREFS } from "@/constants/routes";
import { colors, fontSize, header, radius, spacing } from "@/constants/theme";

export function HeaderSearchBar() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const barWidth = width - header.menuButtonWidth - spacing.md;

  return (
    <Pressable
      onPress={() => router.push(HREFS.search)}
      accessibilityRole="search"
      accessibilityLabel={SEARCH_PLACEHOLDER}
      style={({ pressed }) => [styles.bar, { width: barWidth }, pressed && styles.pressed]}
    >
      <Text style={styles.placeholder} numberOfLines={1}>
        {SEARCH_PLACEHOLDER}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: header.searchBarHeight,
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  pressed: {
    opacity: 0.7,
  },
  placeholder: {
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
});
