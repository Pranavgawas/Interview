import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;