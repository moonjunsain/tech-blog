const {Blog} = require('../../models/index')
const router = require('express').Router()
// api/blogs

// when they post a new blog
router.post('/', async (req, res)=> {
    try{
        const {title, body} = req.body
        console.log(req.session.user_id)
        if(title && body){
            await Blog.create({
                title,
                body,
                user_id: req.session.user_id
            })
            res.status(200).json({message: "Successfully uploaded"})
        }else {
            res.status(404).json({message: "Client side error, wrong body content passed in"})
        }
    }catch(err){
        res.status(500).json({message: "Server error while trying to post a new blog", error: err})
    }
})

// when they update an existing a blog
router.put('/:id', async (req, res) => {
    try{
        const {title, body} = req.body
        if(title && body){
            await Blog.update({
                title,
                body
            }, {
                where: {
                    id: req.params.id
                }
            }).catch(err => res.status(404).json({message: "Invalid ID for blog", err}))
            res.status(200).json("Update success")
        }else {
            res.status(400).json("invalid body")
        }

    }catch(err){
        res.status(500).json({message: "Server error while trying to update a post", error: err})
    }
})

// when they delete a blog
router.delete('/:id', async (req, res) => {
    try{
        console.log('========================== \n Delete route hit \n ========================')
        await Blog.destroy({
            where: {
                id: req.params.id
            }
        }).catch(err => res.status(404).json({message: "Invalid Id for blog", err}))

        res.status(200).json("Delete success")

    }catch(err){
        res.status(500).json({message: "Server error while trying to delete a post", error: err})
    }
})

module.exports = router
