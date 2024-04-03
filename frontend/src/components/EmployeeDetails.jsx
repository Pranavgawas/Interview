import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from 'react-bootstrap/Table';


const EmployeeDetails = () => { 
  const [employees, setEmployees] = useState([]);

  useEffect(()=>{
    const getAllEmployee = async ()=> {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error to get data", error);
      }
    };
    getAllEmployee();
  },[]);

  return (
    <div>
      <Card style={{ width: "50rem" }}>
        <Card.Body>
          <Card.Text>
            <h2 className="emp-detail-h2">Employee Details</h2>
            <button className="add-new">+ Add New</button>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>
                      <Button variant="primary">Edit</Button>
                      <Button variant="primary">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeDetails;
