import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AuthSwitchLink } from "@/components/auth/auth-switch-link";
import { Button } from "@/components/button";
import { FormError } from "@/components/form-error";
import { TextField } from "@/components/text-field";
import { MIN_PASSWORD_LENGTH } from "@/constants/auth";
import { ERROR_MESSAGES } from "@/constants/errors";
import { HREFS } from "@/constants/routes";
import { spacing } from "@/constants/theme";
import { useAsyncAction } from "@/hooks/use-async-action";
import { useSession } from "@/hooks/use-session";
import { isFilled, isValidEmail, isValidPassword } from "@/utils/validation";

export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useSession();
  const { run, isRunning, error } = useAsyncAction(signUp);

  const passwordsMatch = password === confirmPassword;
  const confirmError =
    isFilled(confirmPassword) && !passwordsMatch ? ERROR_MESSAGES.passwordsDontMatch : null;

  const canSubmit =
    isFilled(firstName) &&
    isFilled(lastName) &&
    isValidEmail(email) &&
    isValidPassword(password) &&
    passwordsMatch &&
    !isRunning;

  const submit = () =>
    run({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
    });

  return (
    <View style={styles.form}>
      <TextField
        label="First name"
        value={firstName}
        onChangeText={setFirstName}
        autoComplete="given-name"
        textContentType="givenName"
      />
      <TextField
        label="Last name"
        value={lastName}
        onChangeText={setLastName}
        autoComplete="family-name"
        textContentType="familyName"
      />
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
        placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
      />
      <TextField
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={confirmError}
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
      />
      <FormError message={error} />
      <Button
        label={isRunning ? "Creating account…" : "Create account"}
        onPress={submit}
        disabled={!canSubmit}
        variant="primary"
      />
      <AuthSwitchLink prompt="Already have an account?" label="Sign in" href={HREFS.signIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.md,
  },
});
