const path = require('path');
// load dependencies
const env = require('dotenv');
// const csrf = require('csurf');
const express = require('express');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store); // initalize sequelize with session store

const app = express();
// const csrfProtection = csrf();
// const router = express.Router();

const apiRoutes = require('./app/routes/api');
const sequelize = require('./config/database');
const errorController = require('./app/controllers/ErrorController');

env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// required for csurf
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
        store: new SequelizeStore({
            db: sequelize,
        }),
    })
);

// app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    // res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PATCH,POST,PUT,DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, x-access-token'
    );
    next();
});

app.use(apiRoutes);
app.use(errorController.notFound);
app.use(errorController.errorHandler);

sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT);
        console.log(`### MySQL DB connected ###\nApp listening on port ${process.env.PORT}`);
    })
    .catch((err) => {
        console.log(err);
    });
