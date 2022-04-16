import type { NextApiRequest, NextApiResponse } from 'next'
import { UsersDataBase } from '../../DataBase/DB_Objects';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body)
    return new Promise(resolve => {
        UsersDataBase.checkUsernameExists(body.username, res)
    })
}