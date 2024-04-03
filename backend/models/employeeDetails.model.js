import mongoose from "mongoose";

const employeeDetails =new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
});

const EmployeeDetails = mongoose.model("EmployeeDetails",employeeDetails);
export default EmployeeDetails;