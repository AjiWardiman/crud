const express = require('express')
const userControllers = require('../controllers/user')
// const { verifyAuthorizationToken } = require('../middlewares/userMiddleware')
const router = express.Router()

router.post('/register', userControllers.register)
router.get('/all', userControllers.readAll)
router.get('/:id', userControllers.readme)
router.put('/:id', userControllers.update)
router.delete('/:id/delete')

module.exports = router
