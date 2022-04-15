import DB from "./DB";
var bcrypt = require('bcryptjs');

class UsersDB extends DB {

    constructor() {
        super()
    }

    deserializeUser(id, done) {
        this.DBclient.connect((err, client) => {
            client.db("yourfeed").collection("users").findOne({ id: id }, (err, user) => {
                err ? done(err) : done(null, user)
            })
        })
    }

    auth(username, password, done) {
        this.DBclient.connect((err, client) => {
            client.db("yourfeed").collection("users").findOne({ $or: [{ username: username }, { email: username }] }, (err, user) => {
                return err ? done(err) : user ? bcrypt.compare(password, user.password, (err, res) => {
                    res ? done(null, user) : done(null, false, { message: "Incorrect password" })
                }) : done(null, false, { message: "Incorrect username" })
            })
        })
    }

    register(res) {

    }
}

export default UsersDB