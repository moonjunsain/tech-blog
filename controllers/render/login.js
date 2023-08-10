// end point with /login

const router = require('express').Router()

router.get('/', (req, res)=>{
    res.render('login', {loggedIn: req.session.log_in})
})

module.exports = router