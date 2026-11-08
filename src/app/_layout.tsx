import "@/tasks/run-tracking-task";

import { KeyboardProvider } from "react-native-keyboard-controller";

import { RootNavigator } from "@/components/root-navigator";
import { SplashScreenController } from "@/components/splash-screen-controller";
import { SessionProvider } from "@/providers/session-provider";

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <SessionProvider>
        <SplashScreenController />
        <RootNavigator />
      </SessionProvider>
    </KeyboardProvider>
  );
}
