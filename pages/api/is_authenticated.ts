
import type { NextApiRequest, NextApiResponse } from 'next'
const { TokenSTG } = require('../../DB_Objects');

export default (req: NextApiRequest, res: NextApiResponse) => {
    TokenSTG.authToken(req.body.access_token, res);
}