const express=require('express');
const Employee=require('../model/employee')
require('../connection')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer=require('nodemailer')
router.get('/',(req,res)=>{
    res.render("employee/addoredit",{
        viewTitle:"insert Employee"
    });
});

router.post('/',(req,res)=>{
    if(req.body._id==''){
    insertRecord(req,res)
    }else{
        updateRecord(req,res)
    }
})

router.get('/delete/:id',(req,res)=>{
    Employee.findOneAndRemove(req.params.id,(err,doc)=>{
        if (!err) {
            res.redirect('/employee/list');
        } else {
            if(err){
                console.log(`delete your record`)
            }
        }
    })
})
const updateRecord=async(req,res)=>{
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if (!err) {
            res.redirect('employee/list');
        } else {
            if(err){
                
                    res.render('employee/addoredit',{
                        viewTitle:"insert employee",
                        employee:req.body
                    })
                
            }
        }
    })
}
const insertRecord=async(req,res)=>{
    

    const employee=new Employee()
const {fullname,email,mobile,city}=req.body
    employee.fullname=req.body.fullname;
    employee.email=req.body.email;
    employee.mobile=req.body.mobile;
    employee.city=req.body.city;
    
    // async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user:process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD // generated ethereal password
      },
    });
    var textBody = `FROM: ${req.body.fullname}  EMAIL: ${req.body.email}`;
    var htmlBody = `<h2>Mail From Contact Form</h2> <p>from: ${req.body.fullname} ${req.body.city} </p> <p>${req.body.email}</p>  <p>${req.body.mobile}</p>`;
    var mail = {
        from: "DeltaDesignsGlobal@gmail.com", // sender address
        to: "james.a.vandenberg@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
        subject: "Mail From Contact Form", // Subject line
        text: textBody,
        html: htmlBody
    }
  
     // send mail with defined transport object
     transporter.sendMail(mail, function (err, info) {
        if (err) {
            console.log(err);
            response.json({
                message: "message not sent: an error occured; check the server's console log"
            });
        } else {
            response.json({
                message: `Thanks for reaching out! We'll contact you ASAP`
            });
        }
        console.log("Message sent: %s", info.messageId);
    });
  
    
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);

    const addemployee= await employee.save((err) => {
        if (!err) {
            res.redirect('employee/list');
        } else {
            if(err){
                handlevalidationError(err,req.body);
                    res.render('employee/addoredit',{
                        viewTitle:"insert employee",
                        employee:req.body
                    })
                
            }
        }
    })
    console.log(addemployee)

}




router.get('/list',(req,res)=>{
    Employee.find((err,docs)=>{
        if(!err){
            res.render("employee/list",{
                list:docs
            });
        }else{
            console.log("error")
        }
    })
   
})
// const handlevalidationError=(err,body)=>{
//     for(field in err.errors){
//         switch (err.errors[fiels].path) {
//             case fullname:
//                 body[fullnameError]=err.errors[field].message
//                 break;
//             case email:
//                 body[emailerror]=err.errors[field].message
//                 break;
        
//             default:
//                 break;
//         }
//     }

// }
router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,docs)=>{
        if(!err){
            res.render("employee/addoredit",{
                employee:docs,
                viewTitle:"Update Employee"

            })
        }
    });
})

module.exports=router