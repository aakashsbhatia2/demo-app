import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fontSize, radius, spacing } from "@/constants/theme";
import type { PublicUser } from "@/types/user";
import { fullName } from "@/utils/group-run";

const CHECKBOX_SIZE = 24;
const CHECK_MARK = "✓";

type Props = {
  user: PublicUser;
  isSelected: boolean;
  onToggle: (id: string) => void;
};

export function InviteeRow({ user, isSelected, onToggle }: Props) {
  return (
    <Pressable
      style={styles.row}
      onPress={() => onToggle(user.id)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isSelected }}
    >
      <View style={styles.main}>
        <Text style={styles.name} numberOfLines={1}>
          {fullName(user)}
        </Text>
        <Text style={styles.username} numberOfLines={1}>
          @{user.username}
        </Text>
      </View>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected ? <Text style={styles.check}>{CHECK_MARK}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  main: {
    flex: 1,
    gap: spacing.xxs,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.text,
  },
  username: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  checkbox: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderRadius: radius.md / 2,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  check: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: "700",
  },
});
