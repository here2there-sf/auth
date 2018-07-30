import { Router } from 'express';
import AuthController from './controllers/auth.controller';
import UsersController from './controllers/users.controller';
import authenticate from './middleware/authenticate';
import errorHandler from './middleware/error-handler';

const routes = new Router();

// Authentication
routes.post('/auth/login', AuthController.login);

// Users
routes.post('/user', UsersController.create);
routes.get('/user', authenticate, UsersController.fetch);
routes.put('/user', authenticate, UsersController.update);
routes.delete('/user', authenticate, UsersController.delete);

routes.use(errorHandler);

export default routes;
