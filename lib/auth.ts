import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { cookies } from 'next/headers';

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
  return cookies().get('user')?.value;
}

export function isAuthenticated() {
  return Boolean(currentUser());
}
