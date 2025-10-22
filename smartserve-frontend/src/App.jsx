
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerMenu from "./components/CustomerMenu";
import StaffOrders from "./components/StaffOrders";
import AddMenu from "./components/addMenu";
import { Button } from "@mui/material";

function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        <Button component={Link} to="/" variant="contained" style={{ marginRight: 10 }}>
          Customer
        </Button>
        <Button component={Link} to="/staff" variant="contained">
          Staff
        </Button>
        <Button component={Link} to="/add-menu" variant="contained">
          Add-items
        </Button>
      </div>
      <Routes>
        <Route path="/" element={<CustomerMenu />} />
        <Route path="/staff" element={<StaffOrders />} />
        <Route path="/add-menu" element={<AddMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
