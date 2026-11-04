/**
 * @file security.ts
 * Security and authentication utility for TOÁN 9 – CHINH PHỤC TRI THỨC
 * Uses Web Crypto API for salted SHA-256 password hashing and secure token generation.
 */

// Convert ArrayBuffer to hex string
export const bufferToHex = (buffer: ArrayBuffer): string => {
  const byteArray = new Uint8Array(buffer);
  const hexCodes = [...byteArray].map((value) => {
    const hexCode = value.toString(16);
    return hexCode.padStart(2, '0');
  });
  return hexCodes.join('');
};

// Generate cryptographically secure random salt
export const generateSalt = (length: number = 16): string => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return bufferToHex(array.buffer);
};

// Compute salted SHA-256 hash: hash(salt + password + pepper)
export const hashPassword = async (password: string, salt: string): Promise<string> => {
  const pepper = 'TOAN9_GDPT2018_SECURE_PEPPER_KEY';
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${password}:${pepper}`);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
};

// Verify password against salt and stored hash
export const verifyPassword = async (
  passwordAttempt: string,
  salt: string,
  storedHash: string
): Promise<boolean> => {
  const computedHash = await hashPassword(passwordAttempt, salt);
  return computedHash.toLowerCase() === storedHash.toLowerCase();
};

// Generate secure random session token (64 hex chars)
export const generateSessionToken = (): string => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return bufferToHex(array.buffer);
};

// 30 days in milliseconds
export const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

export interface AuthSession {
  userId: string;
  token: string;
  createdAt: number;
  expiresAt: number;
  isStandalonePWA?: boolean;
  userAgent?: string;
}
