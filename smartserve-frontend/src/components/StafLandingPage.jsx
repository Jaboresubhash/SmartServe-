import React from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "50px",
        textAlign: "center",
      }}
    >
      {/* Restaurant Header */}
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#2c3e50",
          textShadow: "1px 1px 2px gray",
        }}
      >
         <i class="fa-brands fa-web-awesome"></i> SmartServe Restaurant
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Welcome, Admin / Staff 👋 <br />
        Manage your restaurant with ease and efficiency.
      </Typography>

      {/* Action Cards */}
      <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 5 }}>
        {/* Add Menu */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add Menu
              </Typography>
              <Typography color="text.secondary">
                Add new dishes to your restaurant menu.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => navigate("/addmenu")}
              >
                Go to Add Menu
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Manage Menu */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Manage Menu
              </Typography>
              <Typography color="text.secondary">
                Edit or delete existing menu items.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={() => navigate("/adminmenu")}
              >
                Go to Admin Menu
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Orders */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Orders
              </Typography>
              <Typography color="text.secondary">
                View and manage all customer orders.
              </Typography>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                onClick={() => navigate("/orders")}
              >
                Go to Orders
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Logout (Optional for later auth system) */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 4,
              transition: "0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Logout
              </Typography>
              <Typography color="text.secondary">
                Sign out from your staff dashboard.
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                onClick={() => navigate("/")}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Footer */}
      <Typography variant="body2" sx={{ mt: 8, color: "gray" }}>
        © {new Date().getFullYear()} SmartServe Restaurant | Managed by Admin
      </Typography>
    </div>
  );
};

export default LandingPage;
