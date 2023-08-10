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
        res.render('error', {error})
    }
})

// renders the page with specific post
router.get('/:id', async (req, res) => {
    try{
        const blogPost = await Blog.findByPk(req.params.id)
        const parsedPost = blogPost.get({plain: true})

        res.render('single-dashboard', {post: parsedPost, loggedIn: req.session.log_in})
    }catch(error){
        res.render('error', {error})
    }
})

router.get('/post', async (req, res) => {
    try{
        console.log('\n===========================================\n')
        console.log("post request made")
        res.render('dashboard-post')
    }catch(error){
        res.render('error', {error})
    }
})

module.exports = router