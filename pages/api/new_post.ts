import { NextApiRequest, NextApiResponse } from "next";
import { PostsDataBase } from "../../DataBase/DB_Objects";
import Post from "../../models/post";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const post = req.body.post as Post
    PostsDataBase.addPost(post, res)
}