import { Response, Request } from "express";
import { UsersDataBase } from '../../DataBase/DB_Objects';


export default (req: Request, res: Response) => {
    UsersDataBase.register(req.body.username, req.body.password, req.body.email, res)
}