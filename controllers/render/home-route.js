// end point with /
// it has to render all the posts in the database with associated user name

const {User, Blog, Comment} = require('../../models')
const router = require('express').Router()

// get all posts with associated user
router.get('/', async (req, res) => {
    try{
        const allPosts = await Blog.findAll({
            include:[{model: User}]
        })
        const parsedPosts = allPosts.map((post) => {
            const parsedPost = post.get({ plain: true });
            parsedPost.username = parsedPost.user.username; // Access username within each post
            return parsedPost;
        });

        res.render('homepage', {posts: parsedPosts, loggedIn: req.session.log_in})
    }catch(error){
        res.render('error', {error, loggedIn: req.session.log_in})
    }
})

// get a single post with associated comment
router.get('/:id', async (req, res) => {
    try{
        const post = await Blog.findByPk(req.params.id, {
            include: [
                {model: User}, 
                {model: Comment, include: {model: User}}
            ]
        })
        const parsedPost = post.get({plain: true})
        parsedPost.username = parsedPost.user.username
        
        res.render('single-post', {post: parsedPost, loggedIn: req.session.log_in})
        
    }catch(error){
        res.render('error', {error, loggedIn: req.session.log_in})
    }
})

module.exports = router