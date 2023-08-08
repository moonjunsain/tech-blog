// imports all the necessary packages
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const hbs = exphbs.create({})
const app = express()
const PORT = process.env.PORT || 3001
const sequelize = require('./config/connection')

// setting up handlebars engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// middle wares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public/')))

app.use(require('./controllers/index'))

// create a connection between database
sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`App listening on http://localhost:${PORT}`)
    })
})
