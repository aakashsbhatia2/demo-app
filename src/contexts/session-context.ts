import { createContext } from "react";

import type { SessionContextValue } from "@/types/auth";

export const SessionContext = createContext<SessionContextValue | null>(null);
