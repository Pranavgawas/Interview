import express from "express";
import { addEmployee,getAllEmployees,getEmployeeById,updateEmployee,deleteEmployee } from "../controller/employeeController.js";

const router = express.Router();

router.post('/', addEmployee)
// to get all
router.get('/', getAllEmployees);

//get single employee
router.get('/:id', getEmployeeById);

//update
router.put('/:id', updateEmployee);

router.delete('/:id',deleteEmployee);

export default router;