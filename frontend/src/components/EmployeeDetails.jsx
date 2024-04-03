import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllEmployee = async () => {
      try {
        const response = await fetch("/api/employees", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employees data");
        }

        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees data:", error);
        setLoading(false);
      }
    };
    getAllEmployee();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Card style={{ width: "50rem" }}>
        <Card.Body>
          <h2 className="emp-detail-h2">Employee Details</h2>
          <Button className="add-new">+ Add New</Button>
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
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeDetails;
