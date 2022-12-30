import express from 'express';
import cors from 'cors';

const app = express();
// TODO configure CORS
app.use(cors());

app.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/aphorism', (_req, res) => {
  const aphorism = {
    text: 'Reissu on aina reissu',
    url: 'test.png'
  };
  res.json(aphorism);
});



export default app;