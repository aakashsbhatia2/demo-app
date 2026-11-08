import { useRouter } from "expo-router";
import { useEffect } from "react";

import { takeResumeTarget } from "@/services/resume";

export function useResumeRun() {
  const router = useRouter();

  useEffect(() => {
    const target = takeResumeTarget();
    if (target) router.push(target);
  }, [router]);
}
