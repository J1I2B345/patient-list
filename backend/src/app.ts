import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { Patient } from './database/models/Patient';

declare module 'express-serve-static-core' {
  interface Request {
    file?: Express.Multer.File;
    patient?: Patient;
  }
}

export const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);
