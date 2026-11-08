import { MIN_PASSWORD_LENGTH } from "@/constants/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string) => EMAIL_PATTERN.test(email.trim());

export const isValidPassword = (password: string) => password.length >= MIN_PASSWORD_LENGTH;

export const isFilled = (value: string) => value.trim().length > 0;
