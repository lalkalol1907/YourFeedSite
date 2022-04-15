import type { NextApiRequest, NextApiResponse } from 'next'
const { PostsDataBase, UsersDataBase, TokenSTG } = require('../../DB_Objects');

export default (req: NextApiRequest, res: NextApiResponse) => {
    PostsDataBase.getPosts(res)
}