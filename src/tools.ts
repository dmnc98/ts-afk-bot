import { ConfigInterface } from './interfaces/config.interface.ts';

export function fileExists(filePath: string): boolean {
  try {
    Deno.statSync(filePath);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err;
  }
}

export function writeConfigToFile(filePath: string, obj: unknown): void {
  Deno.writeTextFileSync(filePath, JSON.stringify(obj, null, 2));
}

export function readConfigFromFile(filePath: string): ConfigInterface {
  return JSON.parse(Deno.readTextFileSync(filePath));
}

export default { fileExists, writeConfigToFile, readConfigFromFile };
