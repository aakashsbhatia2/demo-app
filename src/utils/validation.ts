import {
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  USERNAME_PATTERN,
} from "@/constants/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string) => EMAIL_PATTERN.test(email.trim());

export const isValidPassword = (password: string) => password.length >= MIN_PASSWORD_LENGTH;

export const isFilled = (value: string) => value.trim().length > 0;

export const isValidUsername = (username: string) =>
  username.length >= MIN_USERNAME_LENGTH &&
  username.length <= MAX_USERNAME_LENGTH &&
  USERNAME_PATTERN.test(username);
