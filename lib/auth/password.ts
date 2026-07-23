import bcrypt from "bcryptjs";
import { validatePassword } from "@/lib/auth/password-rules";

export {
  MIN_PASSWORD_LENGTH,
  normalizeEmail,
  validatePassword
} from "@/lib/auth/password-rules";

export async function hashPassword(password: string) {
  const error = validatePassword(password);
  if (error) {
    throw new Error(error);
  }
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
