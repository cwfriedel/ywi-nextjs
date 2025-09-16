import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { cookies } from 'next/headers';
import { createToken, verifyToken } from './token.ts';

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

export async function currentUser(): Promise<string | undefined> {
  const token = cookies().get('user')?.value;
  if (!token) return;
  return (await verifyToken(token)) || undefined;
}

export async function isAuthenticated(): Promise<boolean> {
  return Boolean(await currentUser());
}

export { createToken, verifyToken };
