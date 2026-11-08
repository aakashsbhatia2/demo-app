import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { HREFS } from "@/constants/routes";
import { colors, fontSize, spacing } from "@/constants/theme";
import { useFollowCounts } from "@/hooks/use-follow-counts";

const COUNT_PLACEHOLDER = "–";

export function FollowCounts() {
  const router = useRouter();
  const counts = useFollowCounts();

  return (
    <View style={styles.row}>
      <CountButton
        label="Followers"
        count={counts?.followers}
        onPress={() => router.push(HREFS.followers)}
      />
      <CountButton
        label="Following"
        count={counts?.following}
        onPress={() => router.push(HREFS.following)}
      />
    </View>
  );
}

type CountButtonProps = {
  label: string;
  count: number | undefined;
  onPress: () => void;
};

function CountButton({ label, count, onPress }: CountButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.count, pressed && styles.pressed]}
    >
      <Text style={styles.value}>{count ?? COUNT_PLACEHOLDER}</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  count: {
    flex: 1,
    gap: spacing.xxs,
  },
  pressed: {
    opacity: 0.6,
  },
  value: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    color: colors.text,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textTransform: "uppercase",
  },
});
