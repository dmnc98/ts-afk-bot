import * as nut from '@nut-tree-fork/nut-js';
import { confirm, input, number, select } from '@inquirer/prompts';
import { Config } from './interfaces/config.interface.ts';
import { CONFIG_PATH, fileExists, writeConfigToFile } from './tools.ts';
import { t } from './i18n/index.ts';

const workerUrl = new URL('./mouseMovement.ts', import.meta.url).href;

if (!fileExists(CONFIG_PATH)) {
  await editConfig();
}
let worker: Worker | null = createWorker();

await operations();

function createWorker(): Worker {
  return new Worker(workerUrl, { type: 'module' });
}

async function stopWorker(): Promise<void> {
  if (worker === null) return;
  worker.postMessage('stop');
  // Give the worker a tick to exit its loop cleanly before terminating.
  await new Promise((resolve) => setTimeout(resolve, 50));
  worker.terminate();
  worker = null;
}

async function operations() {
  while (true) {
    const operationsAnswer = await select({
      message: t('operationsPrompt'),
      choices: [
        { name: t('quit'), value: 'quit' },
        {
          name: t('pause'),
          value: 'pause',
          disabled: worker === null && t('pauseDisabled'),
        },
        {
          name: t('restart'),
          value: 'restart',
          disabled: worker !== null && t('restartDisabled'),
        },
        { name: t('edit'), value: 'edit' },
      ],
    });
    switch (operationsAnswer) {
      case 'quit':
        await stopWorker();
        return;
      case 'pause':
        await stopWorker();
        break;
      case 'restart':
        worker = createWorker();
        break;
      case 'edit':
        await editConfig();
        await stopWorker();
        worker = createWorker();
        break;
    }
  }
}

async function editConfig() {
  const delay = await number({
    message: t('delayPrompt'),
    default: 30000,
    required: true,
  }) as number;
  const moveMouse = await confirm({
    message: t('moveMousePrompt'),
    default: true,
  });
  const move = moveMouse
    ? await number({
      message: t('movePixelsPrompt'),
      default: 100,
      required: true,
    })
    : undefined;
  const keyboardInput = await confirm({
    message: t('keyboardInputPrompt'),
    default: false,
  });
  let keyboardInputKey: nut.Key | undefined;
  if (keyboardInput) {
    const keyName = await input({
      message: t('keyboardKeyPrompt'),
      default: 'ScrollLock',
      required: true,
      validate: (value) => {
        if (Object.keys(nut.Key).includes(value)) {
          return true;
        } else {
          return t('invalidValue');
        }
      },
    }) as keyof typeof nut.Key;
    keyboardInputKey = nut.Key[keyName];
  }

  const configObj: Config = {
    delay,
    moveMouse,
    keyboardInput,
    move,
    keyboardInputKey,
  };
  writeConfigToFile(CONFIG_PATH, configObj);
}
