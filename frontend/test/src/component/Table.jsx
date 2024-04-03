import React, { useState } from "react";

function Table() {
  const [rows, setRows] = useState([
    {
      first_name: "",
      email: "",
      phone: "",
    },
  ]);

  const handleUpdateRow = () => {
    setRows([
      ...rows,
      {
        first_name: "",
        email: "",
        phone: "",
      },
    ]);
  };

  const handleDeleteRow = () => {
    setRows(rows.slice(0, rows.length - 1));
  };

  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.first_name}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateRow}
              >
                Update Row
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteRow}
              >
                Delete Row
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
