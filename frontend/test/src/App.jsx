import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "./component/Table";
import "./App.css";

function App() {
  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    setRows([...rows, {
      name: "",
      email: "",
      phone: "",
    }]);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <>
      <h1>Employee Details</h1>
      <Button variant="outline-primary" onClick={handleAddRow}>
        + Add New
      </Button>{' '}
      <Table rows={rows} onDelete={handleDeleteRow} />
    </>
  );
}

export default App;
