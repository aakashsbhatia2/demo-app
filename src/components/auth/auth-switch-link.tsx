import { Link, type Href } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontSize, spacing } from "@/constants/theme";

type Props = {
  prompt: string;
  label: string;
  href: Href;
};

export function AuthSwitchLink({ prompt, label, href }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.prompt}>{prompt}</Text>
      <Link href={href} replace style={styles.link}>
        {label}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.xs,
  },
  prompt: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  link: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.primary,
  },
});
