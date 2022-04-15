import nextConnect from 'next-connect';
import passport from '../../auth/LocalStrategy';
import { Response, Request } from "express";
import User from '../../models/user';
import { AnyError } from 'mongodb';
const { TokenSTG } = require('../../DB_Objects');

const handler = nextConnect()

handler.post((req: Request, res: Response, next) => {
    passport.authenticate('local',
        (err: AnyError, user: User | undefined, info: string) => {
            console.log(err)
            return err
                ? next(err)
                : user
                    ? req.logIn(user, (err) => {
                        console.log(!err)
                        return err
                            ? next(err)
                            : TokenSTG.createToken(user, res);
                    })
                    : res.send({ stat: false, info: info });
        }
    )(req, res, next);
})

export default handler;