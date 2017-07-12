import promiseRouter from 'express-promise-router';

import {
  getClients,
  createClient,
  getClient,
  updateClient,
  deleteClient,
} from '../controllers/client-controller';

const router = promiseRouter();

router.route('/')
  .get(getClients)
  .post(createClient);

router.route('/:cid')
  .get(getClient)
  .delete(deleteClient)
  .patch(updateClient);

export default router;
