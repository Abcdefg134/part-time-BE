import { Application } from 'express';
import userRouter from './api/user/router';

export default class Routes {
    
    public static user(_app: Application){
        return _app.use('/auth', userRouter);
    }
    
}