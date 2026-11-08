import { ERROR_MESSAGES } from "@/constants/errors";
import { authClient } from "@/services/auth-client";
import type { AuthUser, SignInInput, SignUpInput } from "@/types/auth";

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data, error } = await authClient.getSession();
  if (error) throw new Error(error.message ?? ERROR_MESSAGES.sessionLoadFailed);
  return data?.user ? toAuthUser(data.user) : null;
}

export async function signInWithEmail(input: SignInInput): Promise<AuthUser> {
  const { data, error } = await authClient.signIn.email(input);
  if (error || !data) throw new Error(error?.message ?? ERROR_MESSAGES.signInFailed);
  return toAuthUser(data.user);
}

export async function signUpWithEmail({
  firstName,
  lastName,
  username,
  email,
  password,
}: SignUpInput): Promise<AuthUser> {
  const { data, error } = await authClient.signUp.email({
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    username,
    email,
    password,
  });
  if (error || !data) throw new Error(error?.message ?? ERROR_MESSAGES.signUpFailed);
  return toAuthUser(data.user);
}

export async function signOut() {
  const { error } = await authClient.signOut();
  if (error) throw new Error(error.message ?? ERROR_MESSAGES.signOutFailed);
}

type ServerUser = Omit<AuthUser, "username"> & {
  username?: string | null;
};

function toAuthUser(user: ServerUser): AuthUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username ?? "",
    email: user.email,
  };
}
