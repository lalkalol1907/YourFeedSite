import nextConnect from 'next-connect';
import passport from '../../auth/LocalStrategy';
const { TokenSTG } = require('../../DB_Objects');

const handler = nextConnect()

handler.post((req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
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