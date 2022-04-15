const FileSystem = require("fs");

class TokenStorage {

    constructor() {
        this.tokens = {}
    }

    authToken(token, res) {
        if (this.tokens[token]) {
            res.send({ stat: true, user: this.tokens[token] })
            return
        }
        res.send({ stat: false, message: "no token" })
    }

    addToken(token, user) {
        this.tokens[token] = user
    }

    removeToken(token) {
        delete this.tokens[token]
    }

    createToken(user, res) {
        var token = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var length = 40;
        for (var i = 0; i < length; i++) {
            token += characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        this.tokens[token] = user
        console.log(token)
        res.send({ stat: true, user: user, access_token: token })
    }
}

export default TokenStorage