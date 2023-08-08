const router = require('express').Router()
const blogRoute = require('./blogDataRoute')
const commentRoute = require('./commentDataRoute')
const userRoute = require('./userDataRoute')

router.use('/blogs', blogRoute)
router.use('/comments', commentRoute)
router.use('/users', userRoute)

module.exports = router