const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const paspportLocal = require('./config/passport-local')
const MongoStore = require('connect-mongo')(session);
const SassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
app.use(SassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());

//extract style and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));    
app.use(expressLayouts);


app.set('view engine','ejs');
app.set('views','./views');

//mongo staore is used to store the session cookie
app.use(session({
    name:"dstop",
    //Todo - change the secret before deployment
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store:new MongoStore({
            mongooseConnection:db,
            autoRemove : 'disabled'
    },function(err){
        console.log('Connect MongoDB session error'+err);
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Connection error ${err}`);
        return;
    }
    console.log(`Connection Established and server running on port : ${port}`);
})