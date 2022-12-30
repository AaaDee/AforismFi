import { test } from '@jest/globals';
import supertest from 'supertest';
import app from './app';

const api = supertest(app);

test('aphorism returned as json', async () => {
  await api
    .get('/api/aphorism')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

