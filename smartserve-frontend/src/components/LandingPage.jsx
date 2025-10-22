import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
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

      {/* ---------- HERO SECTION ---------- */}
      <Box
        sx={{
          height: "60vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
          textAlign: "center",
    
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" , color:"t" }}>
          Welcome to SmartServe 🍽️
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
          Taste the best dishes crafted with love and tradition!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate("/menu")}
        >
          Explore Menu
        </Button>
      </Box>

      {/* ---------- ABOUT SECTION ---------- */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          About Our Restaurant
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ maxWidth: 700, mx: "auto", mb: 6 }}
        >
          SmartServe brings you a delightful dining experience with a wide
          variety of cuisines. Our chefs use only the freshest ingredients to
          craft each dish with care. Enjoy seamless online ordering and quick
          service right at your table.
        </Typography>

        {/* ---------- QUICK ACTION CARDS ---------- */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, cursor: "pointer" }} onClick={() => navigate("/menu")}>
              <CardMedia
                component="img"
                height="300"
                image="https://marketplace.canva.com/EAGEDq-_tZQ/1/0/1035w/canva-grey-and-beige-minimalist-restaurant-menu-hb5BNMWcQS4.jpg"
                alt="Customer Menu"
              />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  Customer Menu
                </Typography>
                <Typography variant="body2" align="center">
                  Browse and order delicious dishes right from your table.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, cursor: "pointer" }} onClick={() => navigate("/addmenu")}>
              <CardMedia
                component="img"
                height="300"
                image="https://c8.alamy.com/comp/2J63J92/cooking-classes-isolated-cartoon-vector-illustrations-2J63J92.jpg"
                alt="Add Menu"
              />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  Add Menu (Staff)
                </Typography>
                <Typography variant="body2" align="center">
                  Add new dishes and manage menu items easily.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, cursor: "pointer" }} onClick={() => navigate("/orders")}>
              <CardMedia
                component="img"
                height="300"
                image="https://upcdn.io/12a1y1C/image/delivery-form.png?f=webp&c=100&q=80&w=1000&h=625&fit=shrink"
                alt="Order Details"
              />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  Order Details
                </Typography>
                <Typography variant="body2" align="center">
                  View all customer orders and manage them efficiently.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* ---------- FOOTER ---------- */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          📍 Location: Hyderabad, Telangana | ☎️ +91 98765 43210
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          © {new Date().getFullYear()} SmartServe Restaurant | All Rights Reserved
        </Typography>
      </Box>
    </>
  );
};

export default LandingPage;
