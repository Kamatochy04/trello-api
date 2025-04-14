import express from 'express';
import UserRouter from './routes/user';
import CardRouter from './routes/card';
import BoardRouter from './routes/board';
import 'dotenv/config';
import path from 'path';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', UserRouter);
app.use('/api/card', CardRouter);
app.use('/api/board', BoardRouter);

async function ensureDbDirExists(): Promise<void> {
  const dbDir = path.join(process.cwd(), 'db');

  try {
    await fs.mkdir(dbDir, { recursive: true });
    console.log(`Directory ${dbDir} created or already exists`);
  } catch (err) {
    console.error('Failed to create db directory:', err);
    throw err;
  }
}

app.listen(PORT, () => {
  ensureDbDirExists();
  console.log('Server started on port ' + PORT);
});
