import User from "../models/user";
import { Response } from "express";
import fs from 'fs';

require('custom-env').env('yourfeed')

class TokenStorage {

    path?: string
    tokens: { [token: string]: User }

    constructor() {
        this.path = process.env.TOKENS_PATH
        this.tokens = require(`./${this.path}`)
    }

    save() {
        fs.writeFileSync(`./DataBase/${this.path}`, JSON.stringify(this.tokens, null, 4));
    }

    authToken(token: string): {stat: boolean, user?: User} {
        console.log(`auth_token: ${token}`);
        
        if (this.tokens[token]) {
            console.log("found");
            
            return {stat: true, user: this.tokens[token]}
        }
        return {stat: false}
    }

    addToken(token: string, user: User): void {
        this.tokens[token] = user
        console.log("saved");
        
        this.save()
    }

    removeToken(token: string): void {
        delete this.tokens[token]
        this.save()
    }

    createToken(user: User, res: Response): void {
        var token = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var length = 40;
        for (var i = 0; i < length; i++) {
            token += characters.charAt(Math.floor(Math.random() *
                characters.length));
        }
        this.tokens[token] = user
        this.save()

        console.log(token)
        res.send({ stat: true, user: user, access_token: token })
    }
}

export default TokenStorage