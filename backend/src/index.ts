import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from './config/database';
import router from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { DatabaseConnectionError } from './errors/database-connection-error';
import { Patient } from './database/models/Patient';

declare module 'express-serve-static-core' {
  interface Request {
    file?: Express.Multer.File;
    patient?: Patient;
  }
}

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    try {
      await sequelize.sync({ force: true }); // `force: true` drops tables on restart
      console.log('Connection has been established successfully.');
    } catch (error) {
      throw new DatabaseConnectionError();
    }
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to initialize server', error);
  }
};

start();
