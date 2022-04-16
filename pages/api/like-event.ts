import { NextApiRequest, NextApiResponse } from "next";
import { PostsDataBase } from "../../DataBase/DB_Objects";

export default (req: NextApiRequest, res: NextApiResponse) => {
    PostsDataBase.ChangeLike(req.body.user_id, req.body.post_id)
}