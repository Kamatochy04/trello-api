import express from 'express';
import UserRouter from './routes/user';
import CardRouter from './routes/card';
import BoardRouter from './routes/board';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', UserRouter);
app.use('/api/card', CardRouter);
app.use('/api/board', BoardRouter);

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});
