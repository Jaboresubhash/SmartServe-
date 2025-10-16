// import { useState } from 'react';
// import CustomerMenu from './components/CustomerMenu';
// import StaffOrders from './components/StaffOrders'

// function App() {

//   return (
//     <>
//     {/* <CustomerMenu/> */}
//         <StaffOrders/>

//     </>
//   )
// }

// export default App
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerMenu from "./components/CustomerMenu";
import StaffOrders from "./components/StaffOrders";
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
      </div>
      <Routes>
        <Route path="/" element={<CustomerMenu />} />
        <Route path="/staff" element={<StaffOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
