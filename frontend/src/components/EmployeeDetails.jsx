import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const getAllEmployee = async () => {
      try {
        const response = await fetch("/api/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
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

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      // Update the employees state by filtering out the deleted employee
      setEmployees(employees.filter((emp) => emp._id !== employeeId));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      const newEmployee = await response.json();
      setEmployees([...employees, newEmployee]);
      handleCloseModal();
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleEditEmployee = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/employees/${selectedEmployee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const updatedEmployee = await response.json();
      setEmployees(
        employees.map((emp) =>
          emp._id === updatedEmployee._id ? updatedEmployee : emp
        )
      );
      handleCloseModal();
      setSelectedEmployee(null);
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
    setFormData({ name: "", email: "", phone: "" });
  };

  const handleShowEditModal = (employee) => {
    setShowEditModal(true);
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
    });
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Card style={{ width: "50rem" }}>
        <Card.Body>
          <h2 className="emp-detail-h2">Employee Details</h2>
          <Button variant="primary" onClick={handleShowAddModal}>
            + Add New
          </Button>
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
                    <Button
                      variant="primary"
                      onClick={() => handleShowEditModal(employee)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add Employee Modal */}
      <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddEmployee}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Employee
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditEmployee}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="
                phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            Copy code
            <Button variant="primary" type="submit">
              Update Employee
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeDetails;
