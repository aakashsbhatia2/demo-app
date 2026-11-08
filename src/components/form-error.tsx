import { StyleSheet, Text } from "react-native";

import { colors, fontSize } from "@/constants/theme";

type Props = {
  message: string | null;
};

export function FormError({ message }: Props) {
  if (!message) return null;

  return (
    <Text style={styles.error} accessibilityRole="alert">
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    fontSize: fontSize.sm,
    color: colors.error,
  },
});
