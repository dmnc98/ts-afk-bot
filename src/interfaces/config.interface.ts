import { Key } from '@nut-tree-fork/nut-js';

export interface Config {
  delay: number;
  moveMouse: boolean;
  keyboardInput: boolean;
  move?: number;
  keyboardInputKey?: Key;
}
