const {User} = require('../../models/index')
const router = require('express').Router()
// api/users

// a new user signs up
router.post('/', async (req, res) => {
    try{
        const {username, password} = req.body
        if(username && password){
            await User.create({
                username,
                password
            })
            res.status(200).json("Successful signup")
        }else {
            res.status(400).json({message: "Invalid body passed"})
        }
    }catch(error){
        res.status(500).json({message: "Error while trying to post a new user"})
    }
})

module.exports = router