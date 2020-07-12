import express from 'express';
import csrf from 'csurf';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { AppRouter } from './router/index';
import { AppMiddleware } from './middleware/index';

interface IServer {
  app: express.Application;
  port: number;
  init(port:number): void;
  route(): Promise<void>;
  listen(): void;
}

export class Server implements IServer {
  port: number;
  app: express.Application;

  constructor(port: number = 0) {
    this.init(port);
  }

  async init(port: number): Promise<void> {
    this.app = express();
    //@ts-ignore
    this.port = process.env.PORT || 3000;
    this.app.use(cookieParser());

    this.app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true
    }));

    this.app.use(csrf());

    this.app.use(cors());
    await this.middleware();
    await this.route();
  }

  async middleware(): Promise<void> {
    const middleware = new AppMiddleware(this.app);
  }

  async route(): Promise<void> {
    const route = await (new AppRouter()).get();
    this.app.use(route);
    this.listen();
  }

  listen(): void {
    this.app.listen(this.port, () => {
      return console.log(`server is listening on ${this.port}`);
    });
  }
}