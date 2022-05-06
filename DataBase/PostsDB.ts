import DB from "./DB";
import type { NextApiResponse } from 'next'
import Post from "../models/post"
import { MongoClient, AnyError } from "mongodb";

class PostsDB extends DB {

    constructor() {
        super()
    }

    async getPosts(): Promise<Post[]> {
        const client = await this.DBclient.connect()
        const posts = (await client.db("yourfeed").collection("posts").find({}).limit(30).sort({ id: -1 }).toArray()) as Post[]
        await client.close()

        return posts || []
    }

    ChangeLike(user_id: number, post_id: number): void {
        this.DBclient.connect((error?: AnyError, result?: MongoClient) => {
            if (!result) {
                return
            }
            result.db("yourfeed").collection("posts").findOne({ id: post_id }, (err, post) => {
                if (err || !post) {
                    result.close()
                    return
                }
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
                    },
                    (err, res) => result.close()
                )
            })
        })
    }

    addPost(post: Post, res: NextApiResponse) {
        this.DBclient.connect((error?: AnyError, result?: MongoClient) => {
            if (!result) {
                //  TODO: Add Error sending
                res.send({ stat: false })
                return
            }

            result.db("yourfeed").collection("posts").insertOne(post, (err, post) => {
                if (err) {
                    res.send({ stat: false })
                    result.close()
                    return
                }
                res.send({ stat: true })
                result.close()
            })
        })
    }
}

export default PostsDB