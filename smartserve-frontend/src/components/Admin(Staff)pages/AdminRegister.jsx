import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box, Snackbar, Alert } from "@mui/material";
import API from "../../api/api";

const AdminRegister = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/register", formData);
      setAlert({ open: true, message: "Registration successful!", severity: "success" });
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setAlert({ open: true, message: "Registration failed!", severity: "error" });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f8f9fa">
      <Card sx={{ width: 400, p: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            🧑‍🍳 Admin Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" name="name" margin="normal" value={formData.name} onChange={handleChange} required />
            <TextField fullWidth label="Email" name="email" type="email" margin="normal" value={formData.email} onChange={handleChange} required />
            <TextField fullWidth label="Password" name="password" type="password" margin="normal" value={formData.password} onChange={handleChange} required />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </form>
        </CardContent>
      </Card>

      <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminRegister;
