import { expoClient } from "@better-auth/expo/client";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

import { APP_SCHEME, AUTH_STORAGE_PREFIX } from "@/constants/auth";
import { API_URL } from "@/constants/routes";

export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [
    expoClient({
      scheme: APP_SCHEME,
      storagePrefix: AUTH_STORAGE_PREFIX,
      storage: SecureStore,
    }),
    inferAdditionalFields({
      user: {
        firstName: { type: "string", required: true },
        lastName: { type: "string", required: true },
      },
    }),
  ],
});
