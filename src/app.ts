import { Rule, Stylesheet, Declaration } from 'css';
import { CssSelectorParser, Rule as SelectorRule } from 'css-selector-parser';
import express, { Application } from 'express';
import { type } from 'node:os';

export default class App {
  private readonly app: Application;
  private port: number | null;

  constructor() {
    this.app = express();
    this.port = null;
  }

  private parseRule(selector: SelectorRule, rule: Rule): void {
    const declarations = rule.declarations as Declaration[];
    if (selector.tagName === 'server') {
      for (const declaration of declarations) {
        if (declaration.property === 'port') {
          this.port = parseInt(declaration.value!);
        }
      }
    }
  }

  public read(stylesheet: Stylesheet): void {
    if (stylesheet.type !== 'stylesheet') {
      console.error('Invalid css file');
      process.exit(1);
    }

    const sheet = stylesheet.stylesheet!;
    const rules = sheet.rules as Rule[];

    for (const rule of rules) {
      const parser = new CssSelectorParser();
      const parsed = parser.parse(rule.selectors!.join(', '));

      if (parsed.type === 'ruleSet') {
        this.parseRule(parsed.rule, rule);
      } else if (parsed.type === 'selectors') {
        for (const selector of parsed.selectors) {
          this.parseRule(selector.rule, rule);
        }
      }
    }
  }

  public run(): void {
    if (!this.port) {
      console.error('Port is not specified');
      process.exit();
    }

    this.app.listen(this.port, () => console.log(`Server started on port ${this.port}`));
  }
}
