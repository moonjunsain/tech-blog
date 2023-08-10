const router = require('express').Router()
const apiRoute = require('./api/index')
const renderRoute = require('./render/index')

router.use('/api', apiRoute)
router.use('/', renderRoute)

module.exports = router