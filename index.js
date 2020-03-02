const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//extract style and scriptsfrom subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assets'));    
app.use(expressLayouts);

app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
    if(err){
        console.log(`Connection error ${err}`);
        return;
    }
    console.log(`Connection Established and server running on port : ${port}`);
})