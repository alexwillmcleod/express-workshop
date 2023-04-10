import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import todoRouter from './routes/todos';

config(); // Get env vars from .env
const port = process.env.PORT || 3000;

const app = express();
app.use(json()); // Getting data from the json body
app.use(urlencoded()); // Getting data from the json body
app.use(cors());
app.use('/todos/', todoRouter);

// app.get('/', async (req, res) => {
//   res.send('Hello, World!');
// });

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
