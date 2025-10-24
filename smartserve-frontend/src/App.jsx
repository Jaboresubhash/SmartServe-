
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import CustomerMenu from "./components/CustomerMenu";
// import StaffOrders from "./components/StaffOrders";
// import AddMenu from "./components/addMenu";
// import { Button } from "@mui/material";
// import LandingPage from "./components/LandingPage";

// function App() {
//   return (
//     <Router>
//       <div style={{ padding: 20 }}>
//         <Button component={Link} to="/" variant="contained" style={{ marginRight: 10 }}>
//           Customer
//         </Button>
//         <Button component={Link} to="/staff" variant="contained">
//           Staff
//         </Button>
//         <Button component={Link} to="/add-menu" variant="contained">
//           Add-items
//         </Button>
//       </div>
//       <Routes>
//         <Route path="/" element={<CustomerMenu />} />
//         <Route path="/staff" element={<StaffOrders />} />
//         <Route path="/add-menu" element={<AddMenu />} />
//         <Route path="/LandingPage" element={<LandingPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LandingPage from "./components/LandingPage";
import CustomerMenu from "./components/CustomerMenu";
import StaffOrders from "./components/StaffOrders";
import AddMenu from "./components/addMenu";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

// Separate layout component so we can use `useNavigate`
function MainLayout() {
  const navigate = useNavigate();

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}
          >
            🍴 SmartServe Restaurant
          </Typography>

          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/menu")}>
            Customer Menu
          </Button>
          <Button color="inherit" onClick={() => navigate("/addmenu")}>
            Add Menu
          </Button>
          <Button color="inherit" onClick={() => navigate("/orders")}>
            Orders
          </Button>
        </Toolbar>
      </AppBar>

      {/* ---------- ROUTES ---------- */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<CustomerMenu />} />
        <Route path="/addmenu" element={<AddMenu />} />
        <Route path="/orders" element={<StaffOrders />} />
      </Routes>
    </>
  );
}

export default App;

