const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', (req, res, next) => {
    User.create(req.body, (err, user) => {
        if (err) {
            res.json({
                confirmation: 'Fail',
                error: err
            })
            return
        }

        res.json({
            confirmation: 'Success',
            user,
        })
    })
})

module.exports = router