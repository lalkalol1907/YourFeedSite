import DB from "./DB";
import type { NextApiResponse } from 'next'
import Post from "../models/post"
import { MongoClient, AnyError } from "mongodb";

class PostsDB extends DB {

    constructor() {
        super()
    }

    getPosts(res: NextApiResponse): void {
        this.DBclient.connect((err?: AnyError, result?: MongoClient) => {
            if (!result) {
                res.send({stat: false})
                return
            }
            result.db("yourfeed").collection("posts").find({}).toArray((err, posts) => {
                err ? res.send({ stat: false }) : res.send({ stat: true, posts })
            })
        })
    }

    ChangeLike(user_id: number, post_id: number): void {
        this.DBclient.connect((error?: AnyError, result?: MongoClient) => {
            if (!result) {
                return
            }
            result.db("yourfeed").collection("posts").findOne({ id: post_id }, (err, post) => {
                if (err) { return }
                var curlikes = (post as Post).like_users
                if (curlikes.includes(user_id)) {
                    for (let i = 0; i < curlikes.length; i++) {
                        if (curlikes[i] == user_id) {
                            curlikes.splice(i, 1)
                            break
                        }
                    }
                }
                else {
                    curlikes.push(user_id)
                }
                result.db("yourfeed").collection("posts").updateOne(
                    { id: post_id },
                    {
                        $set: { like_users: curlikes }
                    }
                )
            })
        })
    }
}

export default PostsDB