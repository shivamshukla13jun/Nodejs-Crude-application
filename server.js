// import files
require('./model/employee')
const express=require('express')
const path=require('path');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars')
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const nodemailer = require('nodemailer');

const employeeController=require('./controllers/employeeController')
// handlears
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app=express()
const dotenv=require('dotenv');
dotenv.config();
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




mongoose.connect(process.env.URL),  (error) => {
    if (!error) {
        console.log("success connected");
    } else {
        console.log("Error connecting to Database");
    }
};

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server runnng on port`)
})
