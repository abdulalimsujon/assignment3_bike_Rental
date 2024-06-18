import express from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
