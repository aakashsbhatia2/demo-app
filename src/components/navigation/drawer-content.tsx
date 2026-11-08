import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "expo-router/drawer";
import { Alert, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ERROR_MESSAGES } from "@/constants/errors";
import { colors, spacing } from "@/constants/theme";
import { useSession } from "@/hooks/use-session";

export function DrawerContent(props: DrawerContentComponentProps) {
  const { signOut } = useSession();
  const insets = useSafeAreaInsets();

  const logout = () => {
    signOut().catch((error: Error) => Alert.alert(ERROR_MESSAGES.signOutFailed, error.message));
  };

  const confirmLogout = () => {
    Alert.alert("Log out?", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.xs }]}>
        <DrawerItem label="Logout" onPress={confirmLogout} labelStyle={styles.logoutLabel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing.xs,
  },
  logoutLabel: {
    color: colors.error,
  },
});
