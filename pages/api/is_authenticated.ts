const { TokenSTG } = require('../../DB_Objects');
import { Response, Request } from "express";

export default (req: Request, res: Response) => {
    TokenSTG.authToken(req.body.access_token, res);
}