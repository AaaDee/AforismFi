import { Router } from 'express';
import { openAiCall } from './openAiCall';


export const apiRouter = Router();

apiRouter.get('/aphorism', async (req, res) => {
  const { adjectives, topic } = req.query;
  console.log(adjectives, topic);

  if (typeof adjectives !== 'string') {
    return res.status(400).json({ error: 'Query parameter adjectives must be string' }).end();
  }

  if (typeof topic !== 'string') {
    return res.status(400).json({ error: 'Query parameter adjectives must be string' }).end();
  }

  const aphorism = await openAiCall(adjectives, topic);
  return res.json(aphorism);
});

apiRouter.get('/sample', (_req, res) => {
  const aphorism = {
    text: 'Reissu on aina reissu',
    url: 'test.png'
  };
  res.json(aphorism);
});

