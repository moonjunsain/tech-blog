// end point with /
// it has to render all the posts in the database with associated user name

const {User, Blog, Comment} = require('../../models')
const router = require('express').Router()

router.get('/', async (req, res) => {
    
})

// get a single post with associated comment