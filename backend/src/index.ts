import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from './database/config';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World1');
});

app.get('/two', (req, res) => {
  res.send('Hello World two');
});

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: true }); // `force: true` drops tables on restart
    console.log('Database synced!');
    console.log(`Server is running at http://localhost:${PORT}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log('error', err?.message);
  }
});
