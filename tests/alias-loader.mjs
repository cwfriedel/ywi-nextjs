import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const projectRoot = process.cwd();

export async function resolve(specifier, context, defaultResolve) {
  if (specifier === 'next/server') {
    return defaultResolve('next/server.js', context, defaultResolve);
  }

  if (specifier === 'next/headers') {
    return defaultResolve('next/headers.js', context, defaultResolve);
  }

  if (specifier.startsWith('@/')) {
    const relativePath = specifier.slice(2);
    const absolutePath = path.join(projectRoot, relativePath);

    const candidatePaths = [
      absolutePath,
      `${absolutePath}.ts`,
      `${absolutePath}.tsx`,
      path.join(absolutePath, 'index.ts'),
      path.join(absolutePath, 'index.tsx'),
    ];

    for (const candidate of candidatePaths) {
      if (fs.existsSync(candidate)) {
        const url = pathToFileURL(candidate).href;
        return defaultResolve(url, context, defaultResolve);
      }
    }
  }

  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    if (context.parentURL?.startsWith('file:')) {
      const parentPath = fileURLToPath(context.parentURL);
      const absolutePath = path.resolve(path.dirname(parentPath), specifier);

      const candidatePaths = [
        absolutePath,
        `${absolutePath}.ts`,
        `${absolutePath}.tsx`,
        path.join(absolutePath, 'index.ts'),
        path.join(absolutePath, 'index.tsx'),
      ];

      for (const candidate of candidatePaths) {
        if (fs.existsSync(candidate)) {
          const url = pathToFileURL(candidate).href;
          return defaultResolve(url, context, defaultResolve);
        }
      }
    }
  }
  return defaultResolve(specifier, context, defaultResolve);
}
