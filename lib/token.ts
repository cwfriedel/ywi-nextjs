import { webcrypto as nodeCrypto } from 'crypto';

const crypto = globalThis.crypto ?? nodeCrypto;
const SECRET = process.env.AUTH_SECRET || 'dev-secret';
const encoder = new TextEncoder();

let keyPromise: Promise<CryptoKey> | undefined;

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBytes(hex: string): ArrayBuffer {
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string');
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes.buffer;
}

async function getKey() {
  if (!crypto?.subtle) {
    throw new Error('Web Crypto API not available');
  }
  if (!keyPromise) {
    keyPromise = crypto.subtle.importKey(
      'raw',
      encoder.encode(SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify'],
    );
  }
  return keyPromise;
}

export async function createToken(username: string) {
  const key = await getKey();
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(username));
  return `${username}.${bufferToHex(signature)}`;
}

export async function verifyToken(token: string): Promise<string | null> {
  const [name, signature] = token.split('.');
  if (!name || !signature) return null;
  const key = await getKey();
  const signatureBytes = hexToBytes(signature);
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(name),
  );
  return isValid ? name : null;
}
