const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = passport => {
    passport.serializeUser((user, next) => {
        next(null, user)
    })

    passport.deserializeUser((id, next) => {
        User.findById(id, (error, user) => {
            next(error, user)
        })
    })

    const localLogin = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    }, (req, email, password, next) => {
        User.findOne({email}, (error, user) => {
            if (error) return next(error)
    
            if (user === null) return next(new Error('User not found'))
    
            if (user.password !== req.body.password) {
                return next(new Error('Incorrect Password'))
            }
    
            return next(null, user)
        })
    })

    passport.use('localLogin', localLogin)
}