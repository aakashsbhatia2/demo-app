import { useEffect, useState } from "react";

import { findRunToResume } from "@/services/resume";

export function useRunCheck(isSignedIn: boolean) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!isSignedIn) return;
    findRunToResume()
      .catch((error: Error) => console.warn(`Resuming run failed: ${error.message}`))
      .finally(() => setIsChecked(true));
  }, [isSignedIn]);

  return isSignedIn && !isChecked;
}
