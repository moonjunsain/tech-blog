// imports all the necessary packages
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const hbs = exphbs.create({})
const app = express()
const PORT = process.env.PORT || 3001
const sequelize = require('./config/connection')

// setting up handlebars engine
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// session
const sess = {
    secret: 'Jerome does not like cats',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    // sets up session store
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess))

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
