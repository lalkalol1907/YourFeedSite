import User from "../models/user"

const { UsersDataBase } = require('../DB_Objects')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use('local', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, (username: string | undefined, password: string | undefined, done: (error: any, user?: any, options?: {message: string}) => void) => {
    UsersDataBase.auth(username, password, done)
}))

passport.serializeUser((user: User, done: (error: any, user?: any, options?: {message: string}) => void) => {
    done(null, user.id)
})

passport.deserializeUser((id: number, done: (error: any, user?: any, options?: {message: string}) => void) => {
    UsersDataBase.deserializeUser(id, done)
})

export default passport


