import type { NextApiRequest, NextApiResponse } from 'next'
import { UsersDataBase } from '../../DataBase/DB_Objects';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const body = JSON.parse(req.body)
    UsersDataBase.checkEmailExists(body.email, res)
}