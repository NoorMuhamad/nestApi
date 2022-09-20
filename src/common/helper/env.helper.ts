import { existsSync } from 'fs';
import { resolve } from 'path';

/**
 * @description set accurate env for different environments
 * @param dest string
 * @returns string
 */
export function getEnvPath(dest: string): string {

  const env: string | undefined = process.env.NODE_ENV; 
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : 'local.env';
  let filePath: string = resolve(`${dest}/${filename}`);
  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}