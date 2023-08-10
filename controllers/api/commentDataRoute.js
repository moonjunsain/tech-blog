const {Comment} = require('../../models/index')
const router = require('express').Router()
// api/comments

// when they post a new comment
router.post('/', async (req, res) => {
    try{
        const {text, blog_id} = req.body
        if(text && blog_id){
            await Comment.create({
                text,
                user_id: req.session.user_id,
                blog_id
            })
            res.status(200).json("Successful upload")
        }else {
            res.status(400).json({message: "Invalid body passed"})
        }
    }catch(error){
        res.status(500).json({message: "Error while trying to post a comment", error})
    }

})



module.exports = router