import { useState } from "react";

import { ERROR_MESSAGES } from "@/constants/errors";

export function useAsyncAction<TArgs extends unknown[]>(
  action: (...args: TArgs) => Promise<void>,
) {
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (...args: TArgs) => {
    setIsRunning(true);
    setError(null);
    try {
      await action(...args);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : ERROR_MESSAGES.generic);
    } finally {
      setIsRunning(false);
    }
  };

  return { run, isRunning, error };
}
