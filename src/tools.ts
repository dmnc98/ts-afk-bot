import { Config } from './interfaces/config.interface.ts';

export const CONFIG_PATH = 'mouseMovement.config';

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

export function writeConfigToFile(filePath: string, obj: Config): void {
  Deno.writeTextFileSync(filePath, JSON.stringify(obj, null, 2));
}

export function readConfigFromFile(filePath: string): Config {
  const parsed: unknown = JSON.parse(Deno.readTextFileSync(filePath));
  return assertConfig(parsed);
}

function assertConfig(value: unknown): Config {
  if (typeof value !== 'object' || value === null) {
    throw new TypeError('Config must be an object');
  }
  const v = value as Record<string, unknown>;
  if (typeof v.delay !== 'number') {
    throw new TypeError('Config.delay must be a number');
  }
  if (typeof v.moveMouse !== 'boolean') {
    throw new TypeError('Config.moveMouse must be a boolean');
  }
  if (typeof v.keyboardInput !== 'boolean') {
    throw new TypeError('Config.keyboardInput must be a boolean');
  }
  if (v.move !== undefined && typeof v.move !== 'number') {
    throw new TypeError('Config.move must be a number when present');
  }
  if (v.keyboardInputKey !== undefined && typeof v.keyboardInputKey !== 'number') {
    throw new TypeError('Config.keyboardInputKey must be a numeric Key when present');
  }
  return value as Config;
}

export default { fileExists, writeConfigToFile, readConfigFromFile, CONFIG_PATH };
