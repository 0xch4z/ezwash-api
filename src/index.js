import express from 'express'
import compression from 'compression';
import mongoose from 'mongoose';
import logger from 'morgan';
import { json as jsonParser } from 'body-parser';

import * as routers from './routers';
import errorHandler from './middleware/error-handler';

// configure server
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(`Server started on ${port}`);
});

// confiure database
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/ezwash-db';
mongoose.Promise = global.Promise
mongoose.connect(mongoUrl, () => {
  console.info(`Connected to mongodb @ ${mongoUrl}`);
});

// mount middleware
app.use(compression());
app.use(jsonParser());
app.use(logger('dev'));

// mount routers
app.use('/clients', routers.ClientRouter);
app.use('/transactions', routers.TransactionRouter);
app.use('/users', routers.UserRouter);

// handle errors
app.use(errorHandler.notFound);
app.use(errorHandler.returnError);
