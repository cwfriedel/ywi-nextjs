import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { cookies } from 'next/headers';

const SECRET = process.env.AUTH_SECRET || 'dev-secret';

function sign(value: string) {
  return crypto.createHmac('sha256', SECRET).update(value).digest('hex');
}

function createToken(username: string) {
  return `${username}.${sign(username)}`;
}

function verifyToken(token: string): string | null {
  const [name, signature] = token.split('.');
  if (!name || !signature) return null;
  return sign(name) === signature ? name : null;
}

const USERS_PATH = path.join(process.cwd(), 'data', 'users.json');

async function readUsers(): Promise<Record<string, { passwordHash: string }>> {
  const txt = await fs.readFile(USERS_PATH, 'utf8');
  return JSON.parse(txt);
}

export async function verifyUser(username: string, password: string) {
  const users = await readUsers();
  const record = users[username];
  if (!record) return false;
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  return hash === record.passwordHash;
}

export function currentUser() {
  const token = cookies().get('user')?.value;
  if (!token) return;
  return verifyToken(token) || undefined;
}

export function isAuthenticated() {
  return Boolean(currentUser());
}

export { createToken, verifyToken };
