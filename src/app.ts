import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { Request, Response } from 'express';

// import authRoutes from './routes/authRoutes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// app.use('/api/auth', authRoutes);

app.get('/', (_req: Request, res: Response) => {
    res.send('Job Board API (TypeScript) Running');
  });
export default app;
