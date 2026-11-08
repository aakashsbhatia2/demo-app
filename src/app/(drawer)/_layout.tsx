import { Drawer } from "expo-router/drawer";

import { DrawerContent } from "@/components/navigation/drawer-content";
import { SCREENS } from "@/constants/routes";
import { colors } from "@/constants/theme";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ drawerActiveTintColor: colors.primary }}
    >
      <Drawer.Screen name={SCREENS.myRoutes} options={{ title: "My routes" }} />
      <Drawer.Screen name={SCREENS.myRuns} options={{ title: "My runs" }} />
      <Drawer.Screen name={SCREENS.profile} options={{ title: "Profile" }} />
    </Drawer>
  );
}
