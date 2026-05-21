import type { ToggleKeys } from 'autopilot/src/autopilot.ts';

export type Key = ToggleKeys;

export const KEY_VALUES: readonly Key[] = [
  'f1',
  'f2',
  'f3',
  'f4',
  'f5',
  'f6',
  'f7',
  'f8',
  'f9',
  'f10',
  'f11',
  'f12',
  'f13',
  'f14',
  'f15',
  'f16',
  'f17',
  'f18',
  'f19',
  'f20',
  'f21',
  'f22',
  'f23',
  'f24',
  'leftarrow',
  'uparrow',
  'rightarrow',
  'downarrow',
  'delete',
  'home',
  'end',
  'pageup',
  'pagedown',
  'tab',
  'backspace',
  'return',
  'escape',
  'space',
  'meta',
  'alt',
  'control',
  'shift',
  'capslock',
] as const;

export interface ConfigInterface extends TempConfigInterface {
  delay: number;
  moveMouse: boolean;
  keyboardInput: boolean;
}

export interface TempConfigInterface {
  move?: number;
  keyboardInputKey?: Key;
}
