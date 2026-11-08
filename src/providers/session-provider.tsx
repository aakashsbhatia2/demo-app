import { useEffect, useState, type ReactNode } from "react";

import { SessionContext } from "@/contexts/session-context";
import { getCurrentUser, signInWithEmail, signOut, signUpWithEmail } from "@/services/auth";
import type { AuthUser, SessionContextValue } from "@/types/auth";

type Props = {
  children: ReactNode;
};

export function SessionProvider({ children }: Props) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch((error: Error) => console.warn(`Could not load session: ${error.message}`))
      .finally(() => setIsLoading(false));
  }, []);

  const value: SessionContextValue = {
    user,
    isLoading,
    signIn: async (input) => setUser(await signInWithEmail(input)),
    signUp: async (input) => setUser(await signUpWithEmail(input)),
    signOut: async () => {
      await signOut();
      setUser(null);
    },
  };

  return <SessionContext value={value}>{children}</SessionContext>;
}
