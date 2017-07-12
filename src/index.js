import express from 'express'
import compression from 'compression';
import mongoose from 'mongoose';
import { default as logger } from 'morgan';
import { json as jsonParser } from 'body-parser';

import clientRouter from './routers/client-router';
import transactionRouter from './routers/transaction-router';

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/ezwashdb', () => {
  console.log('Connected to mongodb');
});

/**
 * Middleware
 */
app.use(compression());
app.use(jsonParser());
app.use(logger('dev'));

app.use('/clients', clientRouter);
app.use('/transactions', transactionRouter);

app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: 'Not found',
  });
});

// Handle Internal Error
app.use((err, req, res, next) => {
  res.status(500).json({
    error: true,
    message: err.message
  });
  console.error(err);
});
