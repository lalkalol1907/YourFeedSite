const { TokenSTG } = require('../../DB_Objects');

export default (req, res) => {
    TokenSTG.authToken(req.body.access_token, res);
}