import type { NextApiRequest, NextApiResponse } from 'next'
import { PostsDataBase } from '../../DataBase/DB_Objects'

export default (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body)
    PostsDataBase.addPost(body.post, res)
}