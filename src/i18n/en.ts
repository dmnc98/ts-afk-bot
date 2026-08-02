const en = {
  operationsPrompt: 'Which operation do you want to perform?',
  quit: 'Quit the program',
  pause: 'Pause mouse movement',
  pauseDisabled: 'not possible since it is not running.',
  restart: 'Restart mouse movement',
  restartDisabled: 'not possible since it is already running.',
  edit: 'Edit settings',
  delayPrompt: 'Interval between inputs, if not activity is detected in ms.',
  moveMousePrompt: 'Should mouse movement be enabled?',
  movePixelsPrompt: 'Movement in pixels',
  keyboardInputPrompt: 'Should keyboard input be enabled?',
  keyboardKeyPrompt: 'Keyboard input key',
  invalidValue: 'Invalid value',
  configMissing: "Config should have been already created, but wasn't",
  workerFailed: 'Mouse movement worker failed:',
} as const;

export default en;
