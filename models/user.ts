import { ObjectId } from "mongodb"

class User {
    constructor(public id: number, public username: string, public password: string, public email: string, public picture_url: string, public _id?: ObjectId) { }
}

export default User 