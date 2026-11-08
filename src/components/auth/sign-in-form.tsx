import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AuthSwitchLink } from "@/components/auth/auth-switch-link";
import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { TextField } from "@/components/text-field";
import { HREFS } from "@/constants/routes";
import { spacing } from "@/constants/theme";
import { useAsyncAction } from "@/hooks/use-async-action";
import { useSession } from "@/hooks/use-session";
import { isValidEmail } from "@/utils/validation";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useSession();
  const { run, isRunning, error } = useAsyncAction(signIn);

  const canSubmit = isValidEmail(email) && password.length > 0 && !isRunning;

  return (
    <View style={styles.form}>
      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="current-password"
        textContentType="password"
      />
      <FormError message={error} />
      <Button
        label={isRunning ? "Signing in…" : "Sign in"}
        onPress={() => run({ email: email.trim(), password })}
        disabled={!canSubmit}
        variant="primary"
      />
      <AuthSwitchLink prompt="New here?" label="Create an account" href={HREFS.signUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
  },
});
