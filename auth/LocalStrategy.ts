import User from "../models/user"

const { UsersDataBase } = require('../DB_Objects')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use('local', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, (username: string | undefined, password: string | undefined, done) => {
    UsersDataBase.auth(username, password, done)
}))

passport.serializeUser((user: User, done) => {
    done(null, user.id)
})

passport.deserializeUser((id: number, done) => {
    UsersDataBase.deserializeUser(id, done)
})

export default passport


