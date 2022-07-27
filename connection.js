const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB'), { useNewUrlParser: true, useFindAndModify: false,
useUnifiedTopology: true }, (error) => {
    if (!error) {
        console.log("success connected");
    } else {
        console.log("Error connecting to Database");
    }
};