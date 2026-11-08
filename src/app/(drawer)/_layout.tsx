import { Drawer } from "expo-router/drawer";

import { DrawerContent } from "@/components/navigation/drawer-content";
import { HeaderSearchBar } from "@/components/navigation/header-search-bar";
import { SCREENS } from "@/constants/routes";
import { colors } from "@/constants/theme";
import { useResumeRun } from "@/hooks/use-resume-run";

export default function DrawerLayout() {
  useResumeRun();

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: colors.primary,
        headerTitle: () => <HeaderSearchBar />,
        headerTitleAlign: "left",
      }}
    >
      <Drawer.Screen name={SCREENS.myRoutes} options={{ title: "My routes" }} />
      <Drawer.Screen name={SCREENS.myRuns} options={{ title: "My runs" }} />
      <Drawer.Screen name={SCREENS.invites} options={{ title: "Invites" }} />
      <Drawer.Screen name={SCREENS.profile} options={{ title: "Profile" }} />
    </Drawer>
  );
}
