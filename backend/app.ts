import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import tasksRoutes from './routes/tasks.routes';
import postRoutes from './routes/posts.routes';
import groupRoutes from './routes/groups.routes';
import helmet from 'helmet';

const app = express();
const allowedOrigins = (process.env['CORS_ORIGINS'] ?? 'http://localhost:3000,http://localhost:4201,http://localhost:4200')
  .split(',')
  .map(o => o.trim());

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/groups', groupRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

export default app;
