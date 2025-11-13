import React, { useState,useEffect } from "react";
import { TextField, Button, Card, CardContent, Typography, Box, Snackbar, Alert, Link } from "@mui/material";
import { useNavigate  } from "react-router-dom";
import API from "../../api/api";
// import adminregister from "./components/Admin(Staff)pages/AdminRegister"


const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

   // ✅ If already logged in, redirect directly to dashboard
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/login", formData);
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminName", res.data.admin.name);
      setAlert({ open: true, message: "Login successful!", severity: "success" });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setAlert({ open: true, message: "Invalid credentials!", severity: "error" });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" minWidth="100vw" bgcolor="#f8f9fa">
      <Card sx={{ width: 400, p: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            🔑 Admin Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Email" name="email" type="email" margin="normal" value={formData.email} onChange={handleChange} required />
            <TextField fullWidth label="Password" name="password" type="password" margin="normal" value={formData.password} onChange={handleChange} required />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
             <Typography
            align="center"
            sx={{ mt: 2, fontSize: 14, color: "text.secondary" }}
          >
            Don’t have an account?{" "}
            <Link
              component="button"
              variant="body2"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
              onClick={() => navigate("/admin/register")}
            >
              Register here
            </Link>
          </Typography>
        </CardContent>
      </Card>

      <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminLogin;
