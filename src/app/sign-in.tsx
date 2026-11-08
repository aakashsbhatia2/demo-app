import { AuthLayout } from "@/components/auth/auth-layout";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInScreen() {
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to plan your runs.">
      <SignInForm />
    </AuthLayout>
  );
}
