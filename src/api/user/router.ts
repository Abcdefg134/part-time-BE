import {Router} from 'express';
import Middleware from './middleware';
import Controller from './controller';

const router = Router();

router.post('/login', Middleware.login, Controller.login);
router.post('/register', Middleware.register, Controller.register);

export default router;