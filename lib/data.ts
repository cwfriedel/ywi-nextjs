import fs from 'fs/promises';
import path from 'path';

export async function readData<T>(name: string): Promise<T> {
  const file = path.join(process.cwd(), 'data', `${name}.json`);
  const txt = await fs.readFile(file, 'utf8');
  return JSON.parse(txt);
}

export async function writeData<T>(name: string, data: T) {
  const file = path.join(process.cwd(), 'data', `${name}.json`);
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}
