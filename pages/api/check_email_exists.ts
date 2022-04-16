import type { NextApiRequest, NextApiResponse } from 'next'
import { UsersDataBase } from '../../DataBase/DB_Objects';

export default (req: NextApiRequest, res: NextApiResponse) => {
    UsersDataBase.checkEmailExists(req.body.email, res)
}