import { ObjectId } from "mongodb"

class Post {
    constructor(public id: number, public user_id: number, public username: string, public user_pic: string, public text: string, public like_users: number[], public content: string, public _id?: ObjectId) { }
}

export default Post