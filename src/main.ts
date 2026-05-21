import * as nut from '@nut-tree-fork/nut-js';
import { confirm, input, number, select } from '@inquirer/prompts';
import { ConfigInterface, TempConfigInterface } from './interfaces/config.interface.ts';
import { fileExists, writeConfigToFile } from './tools.ts';

const configPath = 'mouseMovement.config';

const workerUrl = new URL('./mouseMovement.ts', import.meta.url).href;

if (!fileExists(configPath)) {
  await editConfig();
}
let worker: Worker | null = createWorker();

await operations();

function createWorker(): Worker {
  return new Worker(workerUrl, { type: 'module' });
}

async function operations() {
  const operationsAnswer = await select({
    message: 'Which operation do you want to perform?',
    choices: [
      { name: 'Quit the program', value: 'quit' },
      {
        name: 'Pause mouse movement',
        value: 'pause',
        disabled: worker !== null ? false : `not possible since it is not running.`,
      },
      {
        name: 'Restart mouse movement',
        value: 'restart',
        disabled: worker === null ? false : `not possible since it is already running. `,
      },
      { name: 'Edit settings', value: 'edit' },
    ],
  });
  switch (operationsAnswer) {
    case 'quit':
      worker?.terminate();
      worker = null;
      // Deno.exit(0)
      return;
    case 'pause':
      worker?.terminate();
      worker = null;
      break;
    case 'restart':
      worker = createWorker();
      break;
    case 'edit':
      await editConfig();
      worker?.terminate();
      worker = createWorker();
      break;
    default:
      break;
  }
  await operations();
}

async function editConfig() {
  const tempConfigObj: TempConfigInterface = {};

  const delay = await number({
    message: 'Interval between inputs, if not activity is detected in ms.',
    default: 30000,
    required: true,
  }) as number;
  const moveMouse = await confirm({
    message: 'Should mouse movement be enabled?',
    default: true,
  });
  if (moveMouse) {
    tempConfigObj.move = await number({
      message: 'Movement in pixels',
      default: 100,
      required: true,
    });
  }
  const keyboardInput = await confirm({
    message: 'Should keyboard input be enabled?',
    default: true,
  });
  if (keyboardInput) {
    const test = await input({
      message: 'Keyboard input key',
      default: `${nut.Key.ScrollLock}`,
      required: true,
      validate: (value) => {
        if (Object.keys(nut.Key).includes(value)) {
          return true;
        } else {
          return 'Invalid value';
        }
      },
    }) as keyof typeof nut.Key;
    tempConfigObj.keyboardInputKey = nut.Key[test];
  }

  let configObj: ConfigInterface = {
    delay: delay,
    moveMouse: moveMouse,
    keyboardInput: keyboardInput,
  };
  configObj = { ...configObj, ...tempConfigObj };
  writeConfigToFile(configPath, configObj);
}
