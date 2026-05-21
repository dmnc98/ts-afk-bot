import AutoPilot from 'autopilot/mod.ts';
import { mouse_move } from 'autopilot/bindings/bindings.ts';
import { ConfigInterface, Key } from './interfaces/config.interface.ts';

/**
 * Class for Mouse Movement
 */
class MouseMovement {
  private configPath = 'mouseMovement.config';
  private config: ConfigInterface = this.getConfig();
  private pilot = new AutoPilot();

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
    let lastPosition = this.pilot.mousePosition();

    while (true) {
      const tmpPosition = this.pilot.mousePosition();
      if (lastPosition.x === tmpPosition.x && lastPosition.y === tmpPosition.y) {
        if (this.config.moveMouse) {
          await this.square();
        }
        if (this.config.keyboardInput && this.config.keyboardInputKey) {
          this.keyboardInput(this.config.keyboardInputKey);
        }
      }
      lastPosition = this.pilot.mousePosition();
      await this.sleep(this.config.delay);
    }
  }

  /**
   * asynchronous function to start moving the mouse in a square shape
   */
  private async square(): Promise<void> {
    if (this.config.move) {
      const start = this.pilot.mousePosition();
      const move = this.config.move;
      mouse_move({ x: start.x + move, y: start.y, d: null });
      await this.sleep(1000);
      mouse_move({ x: start.x + move, y: start.y + move, d: null });
      await this.sleep(1000);
      mouse_move({ x: start.x, y: start.y + move, d: null });
      await this.sleep(1000);
      mouse_move({ x: start.x, y: start.y, d: null });
    }
  }

  /**
   * Press and release the submitted value on the keyboard
   * @param {Key} key Key binding alias which points to a keyboard key
   */
  private keyboardInput(key: Key): void {
    this.pilot.toggleKey(key, true);
    this.pilot.toggleKey(key, false);
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

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default new MouseMovement();
