import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from 'react-bootstrap/Table';

const employees = [
  { name: "John Doe", email: "johndoe@mail.com", phone: "(171) 555-2222" },
  {
    name: "Peter Parker",
    email: "peterparker@mail.com",
    phone: "(313) 555-5735",
  },
  {
    name: "Fran Wilson",
    email: "franwilson@mail.com",
    phone: "(503) 555-9931",
  },
];

const EmployeeDetails = () => {
  return (
    <div>
      <Card style={{ width: "50rem" }}>
        <Card.Body>
          <Card.Text>
            <h2>Employee Details</h2>
            <button>+ Add New</button>
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
                {employees.map((employee, index) => (
                  <tr key={index}>
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
