import bcrypt from 'bcrypt';
import { Model, User } from './model';
import { generateToken } from '../../shared/jwt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY;
const refeshTokenLife: string = process.env.REFESH_TOKEN_LIFE;
const accessTokenLife: string = process.env.ACCESS_TOKEN_LIFE;


export default class Service {

    public static async login(payload){
        console.log("okiee")
        const username = payload.username;
        const password = payload.password;
        const foundUser = await Model.findOne({username: username});
        if (!foundUser || !bcrypt.compareSync(password, foundUser.hash)){
            return 'Username or password are wrong';
        }
        else {
            const refeshToken = await generateToken({_id: foundUser._id}, JWT_SECRET_KEY, refeshTokenLife);
            const accessToken = await generateToken({_id: foundUser._id}, JWT_SECRET_KEY, accessTokenLife);
            return {
                username: foundUser.username,
                email: foundUser.email,
                refeshToken: refeshToken,
                accessToken: accessToken
            }
        }
    }

    public static async register(payload){
        const id = new mongoose.Types.ObjectId();
        const username = payload.username;
        const email = payload.email;
        const salt = bcrypt.genSaltSync(5);
        const password = bcrypt.hashSync(payload.password, salt);
        const foundData = await Model.find(
            {$or: [{username: username},{email: email}]},
            {username: 1, email: 1}
            );
        if (!foundData.length){
            await new Model(<User>{
                _id: id,
                username: username,
                email: email,
                hash: password,
                salt: salt,
                role: 'user'
            }).save( (err) => {
                if (err) throw err;
            });
            const refeshToken = await generateToken({_id: id}, JWT_SECRET_KEY, refeshTokenLife);
            const accessToken = await generateToken({_id: id}, JWT_SECRET_KEY, accessTokenLife);
            this.login({username: username, password: payload.password});
            return {
                username: username,
                email: email,
                refeshToken: refeshToken,
                accessToken: accessToken
            }
        }
        return 'Username or email already exist';
    }

}