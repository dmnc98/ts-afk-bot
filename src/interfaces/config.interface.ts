import { Key } from '@nut-tree-fork/nut-js';

export interface ConfigInterface extends TempConfigInterface {
  delay: number;
  moveMouse: boolean;
  keyboardInput: boolean;
}

export interface TempConfigInterface {
  move?: number;
  keyboardInputKey?: Key;
}
