import * as nut from '@nut-tree-fork/nut-js';
import type { Key } from '@nut-tree-fork/nut-js';
import { Config } from './interfaces/config.interface.ts';
import { CONFIG_PATH, fileExists, readConfigFromFile } from './tools.ts';
import { t } from './i18n/index.ts';

/**
 * Class for Mouse Movement
 */
class MouseMovement {
  private config: Config = this.getConfig();
  private stopRequested = false;

  /**
   * Move Movement constructor that calls the asynchronous startMovement function
   */
  constructor() {
  }

  /**
   * Signal the loop to exit cleanly after the current iteration.
   */
  requestStop(): void {
    this.stopRequested = true;
  }

  /**
   * Start movement by calling both square and keyboardInput
   */
  async startMovement(): Promise<void> {
    let lastPosition = await nut.mouse.getPosition();

    while (!this.stopRequested) {
      const tmpPosition = await nut.mouse.getPosition();
      if (lastPosition.x === tmpPosition.x && lastPosition.y === tmpPosition.y) {
        if (this.config.moveMouse) {
          await this.square();
        }
        if (this.config.keyboardInput && this.config.keyboardInputKey) {
          await this.keyboardInput(this.config.keyboardInputKey);
        }
      }
      lastPosition = await nut.mouse.getPosition();
      await nut.sleep(this.config.delay);
    }
  }

  /**
   * asynchronous function to start moving the mouse in a square shape
   */
  private async square(): Promise<void> {
    if (this.config.move) {
      await nut.mouse.move(nut.right(this.config.move));
      await nut.mouse.move(nut.down(this.config.move));
      await nut.mouse.move(nut.left(this.config.move));
      await nut.mouse.move(nut.up(this.config.move));
    }
  }

  /**
   * Press and release the submitted value on the keyboard
   * @param {Key} key Key binding alias which points to a keyboard key
   */
  private async keyboardInput(key: Key): Promise<void> {
    await nut.keyboard.pressKey(key);
    await nut.keyboard.releaseKey(key);
  }

  private getConfig(): Config {
    if (!fileExists(CONFIG_PATH)) {
      throw new Error(t('configMissing'));
    }
    return readConfigFromFile(CONFIG_PATH);
  }
}

const mover = new MouseMovement();

self.addEventListener('message', (event: MessageEvent) => {
  if (event.data === 'stop') {
    mover.requestStop();
  }
});

try {
  await mover.startMovement();
} catch (err) {
  console.error(t('workerFailed'), err);
  throw err;
}
