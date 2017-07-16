import express from 'express'
import compression from 'compression';
import mongoose from 'mongoose';
import { default as logger } from 'morgan';
import { json as jsonParser } from 'body-parser';

import clientRouter from './routers/client-router';
import transactionRouter from './routers/transaction-router';
import userRouter from './routers/user-router';
import authenticationRouter from './routers/authentication-router';

import errorHandler from './middleware/error-handler';

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/ezwashdb';
mongoose.Promise = global.Promise
mongoose.connect(mongoUrl, () => {
  console.log(`Connected to mongodb @ ${mongoUrl}`);
});

// Priority middleware
app.use(compression());
app.use(jsonParser());
app.use(logger('dev'));

// Routers
app.use('/clients', clientRouter);
app.use('/transactions', transactionRouter);
app.use('/users', userRouter);
app.use('/auth', authenticationRouter);

// Error Handlers
app.use(errorHandler.notFound);
app.use(errorHandler.returnError);
