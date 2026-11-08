import { Stack } from "expo-router";

import { SplashScreenController } from "@/components/splash-screen-controller";
import { SCREENS } from "@/constants/routes";
import { useRunCheck } from "@/hooks/use-run-check";
import { useSession } from "@/hooks/use-session";

export function RootNavigator() {
  const { user, isLoading } = useSession();
  const isSignedIn = user !== null;
  const isCheckingRun = useRunCheck(isSignedIn);
  const isReady = !isLoading && !isCheckingRun;

  if (!isReady) return <SplashScreenController isReady={false} />;

  return (
    <>
      <SplashScreenController isReady />
      <Stack>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name={SCREENS.signIn} options={{ title: "Sign in" }} />
          <Stack.Screen name={SCREENS.signUp} options={{ title: "Create account" }} />
        </Stack.Protected>
        <Stack.Protected guard={isSignedIn}>
          <Stack.Screen name={SCREENS.drawer} options={{ headerShown: false }} />
          <Stack.Screen name={SCREENS.createRoute} options={{ title: "New route" }} />
          <Stack.Screen name={SCREENS.routeDetail} options={{ title: "Route" }} />
          <Stack.Screen name={SCREENS.editRoute} options={{ title: "Edit route" }} />
          <Stack.Screen name={SCREENS.runRoute} options={{ title: "Run" }} />
          <Stack.Screen name={SCREENS.newGroupRun} options={{ title: "Invite runners" }} />
          <Stack.Screen name={SCREENS.groupRun} options={{ title: "Group run" }} />
          <Stack.Screen name={SCREENS.runDetail} options={{ title: "Run" }} />
          <Stack.Screen name={SCREENS.search} options={{ title: "Search" }} />
          <Stack.Screen name={SCREENS.followers} options={{ title: "Followers" }} />
          <Stack.Screen name={SCREENS.following} options={{ title: "Following" }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}
