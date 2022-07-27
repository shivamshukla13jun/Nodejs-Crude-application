const express=require('express');
const Employee=require('../model/employee')
require('../connection')
const router=express.Router();
const { body, validationResult } = require('express-validator');

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

    employee.fullname=req.body.fullname;
    employee.email=req.body.email;
    employee.mobile=req.body.mobile;
    employee.city=req.body.city;
    
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