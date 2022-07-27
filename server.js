// import files
require('./model/employee')
const express=require('express')
const path=require('path');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars')
const bodyParser = require('body-parser');

const employeeController=require('./controllers/employeeController')
// handlears
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app=express()
// Use the bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main",handlebars: allowInsecurePrototypeAccess(Handlebars)}));

app.set('view engine', 'hbs');
app.get("/",(req,res)=>{
    res.render('home');
})
app.use('/employee',employeeController)
const port=4000
app.listen(port,()=>{
    console.log(`server runnng on port ${port}`)
})
