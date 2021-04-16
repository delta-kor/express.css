import { promises as fs } from 'fs';
import css, { Stylesheet } from 'css';
import App from './app';

export default class ExpressCss {
  private readonly path: string;
  private readonly app: App;
  private css: Stylesheet | null;

  constructor(path: string) {
    this.path = path;
    this.app = new App();
    this.css = null;
  }

  private async loadFile(): Promise<void> {
    const file = await fs.readFile(this.path);
    const data = file.toString();
    try {
      this.css = css.parse(data);
    } catch (e) {
      console.error('Invalid css file');
      process.exit(1);
    }
  }

  public async run(): Promise<void> {
    await this.loadFile();
    this.app.read(this.css!);
    this.app.run();
  }
}
