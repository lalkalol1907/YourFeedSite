const { PostsDataBase, UsersDataBase, TokenSTG } = require('../../DB_Objects');
import { Response, Request } from "express";

export default (req: Request, res: Response) => {
    console.log(req)
    PostsDataBase.getPosts(res)
}