import { AuthLayout } from "@/components/auth/auth-layout";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpScreen() {
  return (
    <AuthLayout title="Create your account" subtitle="Save routes and track your runs.">
      <SignUpForm />
    </AuthLayout>
  );
}
