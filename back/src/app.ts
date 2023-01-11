import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { apiRouter } from './controllers/api/api';

const app = express();
// TODO configure CORS
app.use(cors());

app.use('/api/', apiRouter);

app.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>');
});

export default app;