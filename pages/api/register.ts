import nextConnect from 'next-connect';
import { Response, Request } from "express";
import { UsersDataBase } from '../../DataBase/DB_Objects';

const handler = nextConnect()

handler.post((req: Request, res: Response, next) => {
    console.log(req.body.password)
    UsersDataBase.register(req.body.username, req.body.password, req.body.email, res)
})

export default handler