import { AnyError, MongoClient } from "mongodb";
import User from "../models/user";
import DB from "./DB";
import { Response } from "express";
import { NextApiResponse } from "next";
import bcrypt from "bcryptjs"
import { TokenSTG } from "./DB_Objects"

class UsersDB extends DB {

    constructor() {
        super()
    }

    deserializeUser(id: number, done: (error: any, user?: any, options?: { message: string }) => void): void {
        this.DBclient.connect((err?: AnyError, result?: MongoClient) => {
            if (!result) {
                done(err)
                return
            }
            result.db("yourfeed").collection("users").findOne({ id: id }, (err, user) => {
                err ? done(err) : done(null, user)
                result.close()
            })
        })
    }

    auth(username: string | undefined, password: string | undefined, done: (error: any, user?: any, options?: { message: string }) => void): void {
        this.DBclient.connect((err?: AnyError, result?: MongoClient) => {
            if (!result) {
                done(err)
                return
            }
            if (!password) {
                done(null, false, { message: "Incorrect password" })
                result.close()
                return
            }
            if (!username) {
                done(null, false, { message: "Incorrect username" })
                result.close()
                return
            }

            result.db("yourfeed").collection("users").findOne({ $or: [{ username: username }, { email: username }] }, (err, user) => {
                result.close()
                return err ? done(err) : user ? bcrypt.compare(password, user.password, (err: Error | undefined, res: boolean) => {
                    res ? done(null, user) : done(null, false, { message: "Incorrect password" })
                }) : done(null, false, { message: "Incorrect username" })
            })
        })
    }

    register(username: string, password: string, email: string, res: Response): void {
        this.DBclient.connect((err?: AnyError, result?: MongoClient) => {

            if (!result) {
                return
            }
            result.db("yourfeed").collection("users").findOne({}, { sort: { id: -1 } }, (err, user) => {
                if (!user) {
                    res.send({ stat: false, err: err })
                    result.close()
                    return
                }
                bcrypt.hash(password, 10, (err, hashed) => {
                    if (err) {
                        res.send({ stat: false, err: err })
                        result.close()
                        return
                    }
                    var new_user = new User(user.id + 1, username, hashed, email, "")
                    result.db("yourfeed").collection("users").insertOne(new_user, (err, user) => {
                        console.log(result)
                        if (!user) {
                            res.send({ stat: false, err: err })
                            result.close()
                            return
                        }
                        result.close()
                        TokenSTG.createToken(new_user, res)
                    })
                })
            })
        })
    }

    checkUsernameExists(username: string, res: NextApiResponse): void {
        console.log(username)
        this.DBclient.connect((err?: AnyError, result?: MongoClient) => {
            if (!result) {
                res.send({ stat: false, err: err })
                return
            }

            result.db("yourfeed").collection("users").findOne({ username: username }, (err, user) => {
                if (err) {
                    result.close()
                    res.send({ stat: false, err: err })
                    return
                }
                result.close()
                console.log(user)
                res.send({ stat: true, exists: user ? true : false })
            })
        })
    }

    checkEmailExists(email: string, res: NextApiResponse): void {
        this.DBclient.connect((err?: AnyError, result?: MongoClient) => {
            if (!result) {
                res.send({ stat: false, err: err })
                return
            }

            result.db("yourfeed").collection("users").findOne({ email: email }, {}, (err, user) => {
                console.log(user)
                if (err) {
                    result.close()
                    res.send({ stat: false, err: err })
                    return
                }
                result.close()

                res.send({ stat: true, exists: user ? true : false })
            })
        })
    }

    async getUser(user_id: number): Promise<User | undefined> {
        const client = await this.DBclient.connect()
        const user = (await client.db("yourfeed").collection("users").findOne({ id: user_id })) as User
        await client.close()
        if (!user) {
            return undefined
        }
        delete user._id
        return user
    }
}

export default UsersDB