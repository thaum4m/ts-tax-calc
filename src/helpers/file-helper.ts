import { fileURLToPath } from 'url';
import { readFile, access } from 'node:fs/promises';

export const loadJsonFile = async <T = Record<string, unknown>>(
  fileUrl: URL,
): Promise<T> => {
  const filePath: string = fileURLToPath(fileUrl);
  await access(filePath); // Throws error if file does not exist.
  const json = await readFile(filePath, { encoding: 'utf8' });
  return JSON.parse(json);
};
