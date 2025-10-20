import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { MdEdit, MdDelete, MdPersonAdd, MdSearch } from "react-icons/md";
import { Spinner, Alert, Badge, InputGroup } from "react-bootstrap";
import './Style.css';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const getAllEmployee = async () => {
      try {
        setError(null);
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
        setError("Failed to load employees. Please try again.");
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
      setEmployees(employees.filter((emp) => emp.id !== employeeId && emp._id !== employeeId));
      setSuccess("Employee deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Failed to delete employee. Please try again.");
      setTimeout(() => setError(null), 3000);
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
      setSuccess("Employee added successfully!");
      setTimeout(() => setSuccess(null), 3000);
      handleCloseModal();
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error adding employee:", error);
      setError("Failed to add employee. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleEditEmployee = async (e) => {
    e.preventDefault();

    try {
      const employeeId = selectedEmployee.id || selectedEmployee._id;
      const response = await fetch(`/api/employees/${employeeId}`, {
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
          (emp._id === employeeId || emp.id === employeeId) ? updatedEmployee : emp
        )
      );
      setSuccess("Employee updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
      handleCloseModal();
      setSelectedEmployee(null);
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Failed to update employee. Please try again.");
      setTimeout(() => setError(null), 3000);
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
    setShowDeleteModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.includes(searchTerm)
  );

  return (
    <div className="employee-container">
      <div className="header-section">
        <div className="header-content">
          <h1 className="main-title">
            <MdPersonAdd className="title-icon" />
            Employee Management System
          </h1>
          <p className="subtitle">Manage your team efficiently</p>
        </div>
      </div>

      <div className="content-wrapper">
        <Card className="main-card">
          <Card.Body>
            {/* Success/Error Alerts */}
            {success && (
              <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert variant="danger" dismissible onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            {/* Action Bar */}
            <div className="action-bar">
              <div className="search-section">
                <InputGroup className="search-input-group">
                  <InputGroup.Text>
                    <MdSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="button-section">
                <Badge bg="info" className="employee-count">
                  Total: {employees.length}
                </Badge>
                <Button 
                  variant="primary" 
                  className="add-button"
                  onClick={handleShowAddModal}
                >
                  <MdPersonAdd className="button-icon" />
                  Add Employee
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="loading-container">
                <Spinner animation="border" variant="primary" />
                <p>Loading employees...</p>
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="empty-state">
                <MdPersonAdd className="empty-icon" />
                <h3>No employees found</h3>
                <p>
                  {searchTerm
                    ? "Try adjusting your search"
                    : "Start by adding your first employee"}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop/Tablet Table View */}
                <div className="table-container desktop-view">
                  <Table responsive hover className="modern-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th>Phone</th>
                        <th className="actions-column">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee, index) => (
                        <tr key={employee._id || employee.id}>
                          <td className="index-cell">{index + 1}</td>
                          <td className="name-cell">{employee.name}</td>
                          <td className="email-cell">{employee.email}</td>
                          <td className="phone-cell">{employee.phone}</td>
                          <td className="actions-cell">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="action-btn edit-btn"
                              onClick={() => handleShowEditModal(employee)}
                              title="Edit Employee"
                            >
                              <MdEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="action-btn delete-btn"
                              onClick={() => handleShowDeleteModal(employee)}
                              title="Delete Employee"
                            >
                              <MdDelete />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="mobile-view">
                  {filteredEmployees.map((employee, index) => (
                    <Card key={employee._id || employee.id} className="employee-card">
                      <Card.Body>
                        <div className="employee-card-header">
                          <div className="employee-number">#{index + 1}</div>
                          <div className="employee-actions">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="mobile-action-btn"
                              onClick={() => handleShowEditModal(employee)}
                              title="Edit"
                            >
                              <MdEdit />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="mobile-action-btn"
                              onClick={() => handleShowDeleteModal(employee)}
                              title="Delete"
                            >
                              <MdDelete />
                            </Button>
                          </div>
                        </div>
                        <div className="employee-card-content">
                          <div className="employee-info">
                            <strong>Name:</strong> {employee.name}
                          </div>
                          <div className="employee-info">
                            <strong>Email:</strong> {employee.email}
                          </div>
                          <div className="employee-info">
                            <strong>Phone:</strong> {employee.phone}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </div>

      {/* Add Employee Modal */}
      <Modal show={showAddModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            <MdPersonAdd className="modal-icon" />
            Add New Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleAddEmployee}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <div className="modal-actions">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Employee
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            <MdEdit className="modal-icon" />
            Edit Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <Form onSubmit={handleEditEmployee}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="modal-actions">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Update Employee
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="modal-header-danger">
          <Modal.Title>
            <MdDelete className="modal-icon" />
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          <p className="delete-warning">
            Are you sure you want to delete <strong>{selectedEmployee?.name}</strong>?
          </p>
          <p className="delete-subtext">This action cannot be undone.</p>
          <div className="modal-actions">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={() => handleDelete(selectedEmployee?.id || selectedEmployee?._id)}
            >
              Delete Employee
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeDetails;
