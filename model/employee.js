const mongoose=require('mongoose');

const employeeSchema=mongoose.Schema({
    fullname:{type:String,required:"this fiels is required"},
    email:{type:String},
    mobile:{type:String},
    city:{type:String},
   
},{
    timestamps:true
});
const Employee=mongoose.model("Employee",employeeSchema);
module.exports=Employee