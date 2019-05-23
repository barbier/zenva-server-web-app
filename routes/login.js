const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', (req, res, next) => {
    const email = req.body.email
    User.findOne({email}, (error, user) => {
        if (error) return next(error)

        if (user === null) return next(new Error('User not found'))

        if (user.password !== req.body.password) {
            return next(new Error('Incorrect Password'))
        }

        res.json({
            confirmation: 'Success',
            user,
        })
    })
})

module.exports = router