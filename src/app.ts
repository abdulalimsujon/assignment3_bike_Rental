import express from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
const app = express();

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api', router);
app.get('/', (req, res) => {
  res.send('This is my third assignment');
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
