import EmployeeDetails from "../models/employeeDetails.model.js"

export const getAllEmployees = async (req, res) =>{
    try {
        const employees = await EmployeeDetails.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
}

export const getEmployeeById = async (req, res) =>{
    try {
        const employee = await EmployeeDetails.findById(req.params.id);
        if(!employee){
            return res.status(404).json({ message:'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
}

export const updateEmployee = async (req, res) =>{
    try {
        const employee = await EmployeeDetails.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        }, { new: true });
        if(!employee){
            return res.status(404).json({ message:'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
}

export const deleteEmployee = async (req, res) =>{
    try {
        const employee = await EmployeeDetails.findByIdAndDelete(req.params.id);
        if(!employee){
            return res.status(404).json({ message:'Employee not found' });
        }
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
}

export const addEmployee = async (req, res) =>{
    const employee = new EmployeeDetails({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    });
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message:error.message });
    }
}
