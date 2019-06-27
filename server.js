const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

const auth = require('./config/auth')(passport)
const homeRoute = require('./routes/home')
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const accountRoute = require('./routes/account')

mongoose.connect('mongodb://localhost/sampleStore', { useNewUrlParser: true }, (err, data) => {
    if (err) {
        console.log(`Error: ${err}`)
        return
    }
    console.log('Connected to database')
})

const app = express()
app.use(session({
    secret: 'asdfasdf',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hjs')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', homeRoute)
app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/account', accountRoute)

app.use((err, req, res, next) => {
    res.render('error', { message: err.message })
})

app.listen(5000)
console.log('Listening to localhost:5000')