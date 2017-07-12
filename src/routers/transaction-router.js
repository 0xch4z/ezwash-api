import promiseRouter from 'express-promise-router';

import {
  getTransactions,
  createTransaction,
  getTransaction,
  deleteTransaction,
  updateTransaction,
} from '../controllers/transaction-controller';

const router = promiseRouter();

router.route('/')
  .get(getTransactions)
  .post(createTransaction);

router.route('/:tid')
  .get(getTransaction)
  .delete(deleteTransaction)
  .patch(updateTransaction);

export default router;
