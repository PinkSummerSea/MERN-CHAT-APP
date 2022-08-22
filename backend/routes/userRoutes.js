const express = require('express')
const user = require('../controllers/userController')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(user.regeisterUser).get(protect, user.allUsers)
router.post('/login', user.authUser)


module.exports = router