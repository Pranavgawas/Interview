import EmployeeDetails from "../models/employeeDetails.model.js"

export const getAllEmployees = async (req, res) =>{
    try {
        const employees = await EmployeeDetails.find();
        res.json(employees);
    } catch (error) {
        res.status(500),json({ message:error.message});
    }
}

export const getEmployeeById = async (req, res) =>{
    try {
        const employee =await EmployeeDetails.findById(req.param.id);
        if(!employee){
            return res.status(404).json({message:'Employee not found'});
        }
        res.json(employee);
    } catch (error) {
        res.status(500),json({ message:error.message});
    }
}

export const updateEmployee = async (req, res) =>{

        const employee = new EmployeeDetails({
            name:req.bodt.name,
            email:req.body.email,phone:req.body.phone,
        });
    try {
        const newEmployee = await employee.save();
        res.satus(201).json(newEmployee);
    } catch (error) {
        res.status(400),json({ message:error.message});
    }
}

export const deleteEmployee = async (req, res) =>{
    try {
        const employee = await EmployeeDetails.findById(req.param.id);
        if(!employee){
            return res.status(404).json({message:'employee not found'});
        }
        employee.name = req.body.name || employee.name;
        employee.email = req.body.email || employee.email;
        employee.phone = req.body.phone || employee.phone;
        const updateEmployee = awaitemployee.save();
        res.json(updateEmployee);
    } catch (error) {
        res.status(500),json({ message:error.message});
    }
}

export const addEmployee = async (req, res) =>{
    const employee =new EmployeeDetails({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    });
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400),json({ message:error.message});
    }
}