// imports all the necessary packages
const express = require('express')
const sequelize = require('./config/connection')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3001

// middle wares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(path.join(__dirname, 'public'))

app.use(require('./controllers/index'))

// create a connection between database
sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`App listening on http://localhost:${PORT}`)
    })
})
