import { StyleSheet } from "react-native";

import { Button } from "@/components/button";
import { spacing } from "@/constants/theme";

type Props = {
  isFollowing: boolean;
  isPending: boolean;
  onPress: () => void;
};

export function FollowButton({ isFollowing, isPending, onPress }: Props) {
  return (
    <Button
      label={isFollowing ? "Following" : "Follow"}
      onPress={onPress}
      disabled={isPending}
      variant={isFollowing ? "secondary" : "primary"}
      style={styles.button}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
});
