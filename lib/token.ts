let cryptoPromise: Promise<Crypto> | undefined;
let resolvedCrypto: Crypto | undefined;
const encoder = new TextEncoder();

let cachedSecret: string | undefined;

function getAuthSecret(): string {
  if (cachedSecret) {
    return cachedSecret;
  }

  const secret = typeof process !== 'undefined' ? process.env?.AUTH_SECRET : undefined;
  if (!secret) {
    throw new Error('AUTH_SECRET environment variable is not set');
  }

  cachedSecret = secret;
  return cachedSecret;
}

let keyPromise: Promise<CryptoKey> | undefined;
let keyCrypto: Crypto | undefined;
let keySecret: string | undefined;

async function getCrypto(): Promise<Crypto> {
  if (resolvedCrypto) {
    return resolvedCrypto;
  }

  if (!cryptoPromise) {
    cryptoPromise = (async () => {
      const globalCrypto = globalThis.crypto;
      if (globalCrypto?.subtle) {
        return globalCrypto;
      }

      if (typeof process !== 'undefined' && process.versions?.node) {
        const { webcrypto } = await import('crypto');
        if (webcrypto?.subtle) {
          return webcrypto as Crypto;
        }
      }

      throw new Error('Web Crypto API not available');
    })();
  }

  resolvedCrypto = await cryptoPromise;
  return resolvedCrypto;
}

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

async function getKey(crypto: Crypto) {
  const secret = getAuthSecret();
  if (!keyPromise || keyCrypto !== crypto || keySecret !== secret) {
    keyCrypto = crypto;
    keySecret = secret;
    keyPromise = crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign', 'verify'],
    );
  }
  return keyPromise;
}

export async function createToken(username: string) {
  const crypto = await getCrypto();
  const key = await getKey(crypto);
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(username));
  return `${username}.${bufferToHex(signature)}`;
}

export async function verifyToken(token: string): Promise<string | null> {
  const [name, signature] = token.split('.');
  if (!name || !signature) return null;
  const crypto = await getCrypto();
  const key = await getKey(crypto);
  const signatureBytes = hexToBytes(signature);
  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(name),
  );
  return isValid ? name : null;
}
