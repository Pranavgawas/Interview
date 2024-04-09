import mongoose from "mongoose";

const employeeDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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

const EmployeeDetails = mongoose.model("EmployeeDetails", employeeDetailsSchema);
export default EmployeeDetails;
