const express = require('express')
const user = require('../controllers/userController')
const router = express.Router()

router.route('/').post(user.regeisterUser)
router.post('/login', user.authUser)

module.exports = router