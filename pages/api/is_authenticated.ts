
import type { NextApiRequest, NextApiResponse } from 'next'
import { TokenSTG } from '../../DataBase/DB_Objects';

export default (req: NextApiRequest, res: NextApiResponse) => {
    TokenSTG.authToken(req.body.access_token, res);
}