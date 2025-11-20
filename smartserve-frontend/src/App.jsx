
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import LandingPage from "./components/Customerpages/LandingPage";
import CustomerMenu from "./components/Customerpages/CustomerMenu";

import StaffOrders from "./components/Admin(Staff)pages/StaffOrders";
import AddMenu from "./components/Admin(Staff)pages/addMenu";
import AdminMenuList from "./components/Admin(Staff)pages/AdminMenuLIst";
import StafLandingPage from "./components/Admin(Staff)pages/StafLandingPage";
import DashboardLayout from "./components/Admin(Staff)pages/DashboardLayout";

import AdminLogin from "./components/Admin(Staff)pages/AdminLogin";
import AdminRegister from "./components/Admin(Staff)pages/AdminRegister";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const navigate = useNavigate();

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="h5"
            
            sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1  }}
          >
            SmartServe Restaurant
          </Typography>

          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/menu")}>
            Customer Menu
          </Button>
          <Button color="inherit" onClick={() => navigate("/admin/login")}>
            Admin
          </Button>
        </Toolbar>
      </AppBar>

      {/* ---------- ROUTES ---------- */}
      <Routes>
        {/* ---- CUSTOMER ROUTES ---- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<CustomerMenu />} />

        {/* ---- ADMIN AUTH ROUTES ---- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* ---- PROTECTED DASHBOARD ---- */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StafLandingPage />} />
          <Route path="addmenu" element={<AddMenu />} />
          <Route path="adminmenu" element={<AdminMenuList />} />
          <Route path="orders" element={<StaffOrders />} />
        </Route>

        {/* ---- CATCH-ALL ---- */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

/* ---------- PROTECTED ROUTE COMPONENT ---------- */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default App;
