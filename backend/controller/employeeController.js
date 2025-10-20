import { db } from "../db/connectToFirebase.js";

const employeesCollection = db.collection('employees');

export const getAllEmployees = async (req, res) => {
    try {
        const snapshot = await employeesCollection.get();
        const employees = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getEmployeeById = async (req, res) => {
    try {
        const doc = await employeesCollection.doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const employeeRef = employeesCollection.doc(req.params.id);
        const doc = await employeeRef.get();
        
        if (!doc.exists) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        await employeeRef.update({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });
        
        const updatedDoc = await employeeRef.get();
        res.json({ id: updatedDoc.id, ...updatedDoc.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const employeeRef = employeesCollection.doc(req.params.id);
        const doc = await employeeRef.get();
        
        if (!doc.exists) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        await employeeRef.delete();
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addEmployee = async (req, res) => {
    try {
        const employeeData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        };
        
        const docRef = await employeesCollection.add(employeeData);
        const newDoc = await docRef.get();
        
        res.status(201).json({ id: newDoc.id, ...newDoc.data() });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
