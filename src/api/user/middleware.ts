import {validUsername, validPassword, validEmail} from '../../shared/valid';

interface Login {
    username: string,
    password: string
}

interface Register {
    username: string,
    password: string,
    email: string
}

export default class Middleware {

    public static login(req, res, next): any {
        try {
            const payload: Login = req.body;
            if (!validUsername(payload.username)){
                throw new Error('Something went wrong. Please try again!');
            }
            if (!validPassword(payload.password)){
                throw new Error('Something went wrong. Please try again!');
            }
            next();
        }
        catch(err) {
            console.log(err);
            res.status(401).send(err);
        }
    }

    public static register(req, res, next): any {
        try {
            const payload: Register = req.body;
            if (!validUsername(payload.username)){
                throw new Error('Something went wrong. Please try again!');
            }
            if (!validPassword(payload.password)){
                throw new Error('Something went wrong. Please try again!');
            }
            if (!validEmail(payload.email)){
                throw new Error('Something went wrong. Please try again!');
            }
            next();
        }
        catch(err) {
            console.log(err);
            res.status(401).send(err);
        }
    }

}