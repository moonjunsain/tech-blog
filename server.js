// imports all the necessary packages
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection')
const helpers = require('./util/helper')

const app = express()
const hbs = exphbs.create({helpers})

const PORT = process.env.PORT || 3001

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
