import type { NextApiRequest, NextApiResponse } from 'next'
import { PostsDataBase } from '../../DataBase/DB_Objects';

export default (req: NextApiRequest, res: NextApiResponse) => {
    PostsDataBase.getPosts(res)
}