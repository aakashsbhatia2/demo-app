import { useRouter } from "expo-router";

import { Button } from "@/components/button";
import { HREFS } from "@/constants/routes";

export function CreateRouteButton() {
  const router = useRouter();

  return (
    <Button label="Create route" onPress={() => router.push(HREFS.createRoute)} variant="primary" />
  );
}
