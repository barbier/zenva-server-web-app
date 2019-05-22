const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const homeRoute = require('./routes/home')
const registerRoute = require('./routes/register')

mongoose.connect('mongodb://localhost/sample-store', (err, data) => {
    if (err) {
        console.log(`Error: ${err}`)
        return
    }
    console.log('Connected to database')
})

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hjs')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', homeRoute)
app.use('/register', registerRoute)

app.listen(5000)
console.log('Listening to localhost:5000')