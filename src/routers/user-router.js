import promiseRouter from 'express-promise-router';

import {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user-controller';

const router = promiseRouter();

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:uid')
  .get(getUser)
  .delete(deleteUser)
  .patch(updateUser)

export default router;
