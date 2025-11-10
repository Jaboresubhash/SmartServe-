import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LandingPage from "./components/Customerpages/LandingPage";
import CustomerMenu from "./components/Customerpages/CustomerMenu";
import StaffOrders from "./components/Admin(Staff)pages/StaffOrders";
import AddMenu from "./components/Admin(Staff)pages/addMenu";
import AdminMenuList from "./components/Admin(Staff)pages/AdminMenuLIst";
import StafLandingPage from "./components/Admin(Staff)pages/StafLandingPage";
import DashboardLayout from "./components/Admin(Staff)pages/DashboardLayout";
import theme from "./theme";

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
            sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}
          >
            SmartServe Restaurant
          </Typography>

          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/menu")}>
            Customer Menu
          </Button>
          <Button color="inherit" onClick={() => navigate("/dashboard")}>
            Admin
          </Button>
        </Toolbar>
      </AppBar>

      {/* ---------- ROUTES ---------- */}
      <Routes>
        {/* Customer Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<CustomerMenu />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<StafLandingPage />} />
          <Route path="addmenu" element={<AddMenu />} />
          <Route path="adminmenu" element={<AdminMenuList />} />
          <Route path="orders" element={<StaffOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
