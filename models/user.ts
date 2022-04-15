import { ObjectId } from "mongodb"

class User {
    constructor(public id: number, public first_name: string, public last_name: string, public username: string, public password: string, public email: string, public picture_url: string, public _id?: ObjectId) { }
}

export default User 