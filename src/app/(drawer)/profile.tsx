import { StyleSheet, View } from "react-native";

import { ProfileDetails } from "@/components/profile/profile-details";
import { colors } from "@/constants/theme";
import { useSession } from "@/hooks/use-session";

export default function ProfileScreen() {
  const { user } = useSession();

  return <View style={styles.container}>{user ? <ProfileDetails user={user} /> : null}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
