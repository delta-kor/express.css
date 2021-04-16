import express, { Application } from 'express';

export default class App {
  private readonly app: Application;

  constructor() {
    this.app = express();
  }
}
