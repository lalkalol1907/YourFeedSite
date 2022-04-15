import DB from "./DB";

class PostsDB extends DB {

    constructor() {
        super()
    }

    getPosts(res) {
        this.DBclient.connect((error, client) => {


            client.db("yourfeed").collection("posts").find({}).toArray((err, posts) => {
                err ? res.send({ stat: 405 }) : res.send({ stat: 200, posts })
            })
        })
    }

    ChangeLike(user_id, post_id) {
        this.DBclient.connect((error, client) => {
            client.db("yourfeed").collection("posts").findOne({ id: post_id }, (err, post) => {
                if (err) { return }
                var curlikes = post.like_users
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
                client.db("yourfeed").collection("posts").updateOne(
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