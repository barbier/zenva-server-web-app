const express = require('express')
const homeRoute = require('./routes/home')
const app = express()

app.use('/', homeRoute)

app.listen(5000)
console.log('Listening to localhost:5000')