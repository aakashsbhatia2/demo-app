import { SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

type Props = {
  isReady: boolean;
};

export function SplashScreenController({ isReady }: Props) {
  useEffect(() => {
    if (isReady) SplashScreen.hide();
  }, [isReady]);

  return null;
}
