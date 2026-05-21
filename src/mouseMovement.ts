import * as nut from '@nut-tree-fork/nut-js';
import type { Key } from '@nut-tree-fork/nut-js';
import { ConfigInterface } from './interfaces/config.interface.ts';

/**
 * Class for Mouse Movement
 */
class MouseMovement {
  private configPath = 'mouseMovement.config';
  private config: ConfigInterface = this.getConfig();

  /**
   * Move Movement constructor that calls the asynchronous startMovement function
   */
  constructor() {
    this.startMovement().then();
  }

  /**
   * Start movement by calling both square and keyboardInput
   */
  private async startMovement(): Promise<void> {
    let lastPosition = await nut.mouse.getPosition();

    while (true) {
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

  private getConfig(): ConfigInterface {
    try {
      Deno.statSync(this.configPath);
    } catch (error) {
      console.error("Config should have been already created, but wasn't");
      throw error;
    }
    return JSON.parse(Deno.readTextFileSync(this.configPath));
  }
}

export default new MouseMovement();
