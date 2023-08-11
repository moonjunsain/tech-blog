// dash board needs to have a post
// it needs to have a post associated with logged in user
// it needs date and title
// end point with /dashboard

const {Blog} = require('../../models/index')
const router = require('express').Router()
const withAuth = require('../../util/middleware')


// renders the page with posts associated with logged in user
router.get('/', withAuth, async (req, res)=>{
    try{
        const {user_id} = req.session
        const blogPosts = await Blog.findAll({
            where: {
                user_id: user_id
            }
        })
    
        const parsedPosts = blogPosts.map((blog) => blog.get({plain: true}))
        
        res.render('dashboard', {posts: parsedPosts, loggedIn: req.session.log_in})
    }catch(error){
        res.render('error', {error, loggedIn: req.session.log_in})
    }
})

router.get('/post', async (req, res) => {
    try{
        
        res.render('dashboard-post', {loggedIn: req.session.log_in})
    }catch(error){
        res.render('error', {error, loggedIn: req.session.log_in})
    }
})

// renders the page with specific post
router.get('/:id', async (req, res) => {
    try{
        const blogPost = await Blog.findByPk(req.params.id)
        const parsedPost = blogPost.get({plain: true})

        res.render('single-dashboard', {post: parsedPost, loggedIn: req.session.log_in})
    }catch(error){
        res.render('error', {error, loggedIn: req.session.log_in})
    }
})



module.exports = router