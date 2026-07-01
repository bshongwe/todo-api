import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import todoRoutes from './routes/todoRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server iyagijima on port ${PORT}`));