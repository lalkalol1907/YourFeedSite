import nextConnect from 'next-connect';
import { Response, Request } from "express";
import { UsersDataBase } from '../../DataBase/DB_Objects';

const handler = nextConnect()

handler.post((req: Request, res: Response, next) => {
    UsersDataBase.register(req.body.username, req.body.password, req.body.email, res)
})