const router = require('express').Router()
const apiRoute = require('./api/index')
const renderRoute = require('./render/index')

router.use('/api', apiRoute)
router.use('/', renderRoute)

// when the user hits on logout, 
// destroys the session, and redirect the user to homepage

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
})

module.exports = router