'use strict'
// require dependencies
require('dotenv').config();
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');
// main variables
const app = express();
const PORT = process.env.PORT || 3030;
const client = new pg.Client(process.env.DATABASE_URL);
// USES 
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.use(express.json())
app.set('view engine', 'ejs');
///////////////////////////////////////////////////////////////////////////
//ROUTS
app.get('/', homeHandler)
// ROUTS HANDLER
function homeHandler(req,res){
    res.status(200).send('OK')
}
///////////////////////////////////////////////////////////////////////////
// LISTEN TO PORT 
client.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`${PORT}`);

        })
    })
// ERROR HANDLERS
 function notFoundHandler(req,res){
     res.status(404).send(' PAGE NOT FOUND')
 }
 function errorHandler(error, req,res){
    res.status(500).send(' ERROR FOUND')
}