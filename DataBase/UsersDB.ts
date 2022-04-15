import { AnyError, MongoClient } from "mongodb";
import DB from "./DB";
var bcrypt = require('bcryptjs');

class UsersDB extends DB {

    constructor() {
        super()
    }

    deserializeUser(id: number, done: (error: any, user?: any, options?: {message: string}) => void) {
        this.DBclient.connect((err?: AnyError, result?: MongoClient) => {
            if (!result) {
                done(err)
                return
            }
            result.db("yourfeed").collection("users").findOne({ id: id }, (err, user) => {
                err ? done(err) : done(null, user)
            })
        })
    }

    auth(username: string | undefined, password: string | undefined, done: (error: any, user?: any, options?: {message: string}) => void) {
        this.DBclient.connect((err?: AnyError, result?: MongoClient) => {
            if (!result) {
                done(err)
                return
            }
            result.db("yourfeed").collection("users").findOne({ $or: [{ username: username }, { email: username }] }, (err, user) => {
                return err ? done(err) : user ? bcrypt.compare(password, user.password, (err: Error | undefined, res: boolean) => {
                    res ? done(null, user) : done(null, false, { message: "Incorrect password" })
                }) : done(null, false, { message: "Incorrect username" })
            })
        })
    }

    register(res: Response) {

    }
}

export default UsersDB