import promiseRouter from 'express-promise-router';

import {
  authenticateUser
} from '../controllers/user-controller';

const router = promiseRouter();

router.route('/')
  .post(authenticateUser)

export default router;
