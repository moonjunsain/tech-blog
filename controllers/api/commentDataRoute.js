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

// when they want to update a comment
router.put('/:id', async (req, res) => {
    try{
        const {text} = req.body
        if(text){
            await Comment.update({
                text
            }, {
                where: {
                    id: req.params.id
                }
            }).catch(err => res.status(404).json({message: "Invalid id", err}))

            res.status(200).json("Successful update")
        }else {
            res.status(400).json({message: "Invalid body passed"})
        }
    }catch(error){
        res.status(500).json({message: "Error while trying to update a com", error})
    }
})

// when the user deletes
router.delete('/:id', async (req, res) => {
    try{
            await Comment.destroy({
                where: {
                    id: req.params.id
                }
            }).catch(err => res.status(404).json({message: "Invalid id", err}))

            res.status(200).json("Successful delete")
        
    }catch(error){
        res.status(500).json({message: "Error while trying to delete a com", error})
    }
})

module.exports = router