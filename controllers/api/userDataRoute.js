const {User} = require('../../models/index')
const router = require('express').Router()
// api/users

// a new user signs up
router.post('/', async (req, res) => {
    try{
        console.log('======================================')
        console.log(req.body)
        const {username, password} = req.body
        if(username && password){
          const userData =  await User.create({
                username,
                password
            }).catch((error)=>{
                if(error){
                    return res.status(404).json("Not a valid password or username")
                }
            })
            req.session.save(()=>{
                req.session.user_id = userData.id;
                req.session.log_in = true;
                res.status(200).json("Successful signup")
            })
        }else {
            res.status(400).json({message: "Invalid body passed"})
        }
    }catch(error){
        res.status(500).json({message: "Error while trying to post a new user"})
    }
})

router.post('/login', async (req, res)=> {
    try{
        const {username, password} = req.body
        if(username && password){
            const user = await User.findOne({
                where: {
                    username: username
                }
            })

            if(!user){
                res.status(404).json("Incorrect username or password")
                return
            }

            const isValidPw = user.checkPassword(password)

            if(!isValidPw){
                res.status(404).json("Incorrect username or password")
                return
            }

              req.session.save(()=>{
                  req.session.user_id = user.id;
                  req.session.log_in = true;
                  res.status(200).json("Successful login")
              })
              
          }else {
              res.status(400).json({message: "Invalid body passed"})
          }
    }catch(error){
        res.status(500).json({message: "Error while trying to post a new user"})
    }
})

router.post('/logout', (req, res)=>{
   
    req.session.destroy(() => {
        res.status(204).end();
    });
      
})

module.exports = router