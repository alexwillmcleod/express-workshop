import express, { json } from 'express';
import { config } from 'dotenv';

config(); // Get env vars from .env
const port = process.env.PORT || 3000;

const app = express();

app.get('/', async (req, res) => {
  res.send('Hello, World!');
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
