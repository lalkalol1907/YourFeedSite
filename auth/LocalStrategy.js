const { UsersDataBase } = require('../DB_Objects')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use('local', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, (username, password, done) => {
    UsersDataBase.auth(username, password, done)
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    UsersDataBase.deserializeUser(id, done)
})

export default passport


