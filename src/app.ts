import express from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middleware/notFound';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'https://your-netlify-domain.netlify.app',
      'http://localhost:3000',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
);

// Routes
app.use('/api', router);
app.get('/', (req, res) => {
  res.send('This is my third assignment');
});

// Error Handlers
app.use(globalErrorHandler); // Global error handler for all routes
app.use(notFound); // Catch-all for 404 errors

export default app;
