const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// Create Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Employee Collection reference
const employeesCollection = db.collection('employees');

// Get all employees
app.get('/employees', async (req, res) => {
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
});

// Get employee by ID
app.get('/employees/:id', async (req, res) => {
    try {
        const doc = await employeesCollection.doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add new employee
app.post('/employees', async (req, res) => {
    try {
        const employeeData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        
        const docRef = await employeesCollection.add(employeeData);
        const newDoc = await docRef.get();
        
        res.status(201).json({ id: newDoc.id, ...newDoc.data() });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update employee
app.put('/employees/:id', async (req, res) => {
    try {
        const employeeRef = employeesCollection.doc(req.params.id);
        const doc = await employeeRef.get();
        
        if (!doc.exists) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        await employeeRef.update({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        const updatedDoc = await employeeRef.get();
        res.json({ id: updatedDoc.id, ...updatedDoc.data() });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete employee
app.delete('/employees/:id', async (req, res) => {
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
});

// Export the API as a Cloud Function
exports.api = functions.https.onRequest(app);
