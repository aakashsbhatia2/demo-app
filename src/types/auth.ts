export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = SignInInput & {
  firstName: string;
  lastName: string;
};

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type SessionContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (input: SignInInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
};
