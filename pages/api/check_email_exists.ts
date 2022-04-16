import type { NextApiRequest, NextApiResponse } from 'next'
import { UsersDataBase } from '../../DataBase/DB_Objects';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise(resolve => {
        UsersDataBase.checkEmailExists(req.body.email, res)
    })
}