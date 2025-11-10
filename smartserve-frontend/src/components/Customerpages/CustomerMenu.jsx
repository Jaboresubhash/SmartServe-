import React, { useEffect, useState } from "react";
import API from "../../api/api";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  Box,
  Divider,
  Stack,
} from "@mui/material";

const CustomerMenu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableNo, setTableNo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🔹 Fetch menu items
  useEffect(() => {
    API.get("/menu")
      .then((res) => {
        setMenu(res.data);
        setFilteredMenu(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔹 Filter menu based on category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredMenu(menu);
    } else {
      setFilteredMenu(menu.filter((item) => item.category === category));
    }
  };

  // 🔹 Add item to cart
  const addToCart = (item) => {
    setCart([...cart, { ...item, qty: 1 }]);
  };

  // 🔹 Place order
  const placeOrder = () => {
    if (!tableNo) {
      alert("Enter Table Number");
      return;
    }
    API.post("/orders", { table_no: tableNo, items: cart })
      .then(() => {
        alert("Order Placed!");
        setCart([]);
        setTableNo("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* ================= LEFT SIDEBAR ================= */}
      <Box
        sx={{
          width: 250,
          height:"85vh",
          bgcolor: "#2c3e50",
          color: "white",
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
          >
            🍴 Categories
          </Typography>

          <Stack spacing={2}>
            {["All", "Tiffin", "Main Course", "Dessert", "Beverages"].map(
              (cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "contained" : "outlined"}
                  sx={{
                    color: selectedCategory === cat ? "white" : "#fff",
                    // borderColor: "#fff",
                    backgroundColor:
                      selectedCategory === cat ? "#00796b" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedCategory === cat
                          ? "#004d40"
                          : "rgba(255,255,255,0.1)",
                    },
                    textTransform: "capitalize",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleCategoryFilter(cat)}
                  fullWidth
                >
                  {cat}
                </Button>
              )
            )}
          </Stack>
        </Box>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", my: 3 }} />

        <Box>
          <Typography variant="body2" sx={{ textAlign: "center", color: "gray" }}>
            © {new Date().getFullYear()} SmartServe
          </Typography>
        </Box>
      </Box>

      {/* ================= RIGHT SIDE CONTENT ================= */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          overflowY: "auto",
          height: "100vh",
          width:"71vw"
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 4,
            letterSpacing: 1,
          }}
        >
          Explore Our Delicious Menu 🍽️
        </Typography>

        {/* 🔹 Table Number Input */}
        <Box display="flex" justifyContent="center" mb={4}>
          <TextField
            label="Enter Table Number"
            value={tableNo}
            onChange={(e) => setTableNo(e.target.value)}
            sx={{
              width: 300,
              backgroundColor: "white",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* 🔹 Menu Grid */}
        <Grid container spacing={3} justifyContent="center">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    height: 380,
                    width:"20vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 3,
                    boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={
                      item.img
                        ? `http://localhost:5000/uploads/${item.img}`
                        : "https://via.placeholder.com/300x180?text=No+Image"
                    }
                    alt={item.name}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, textTransform: "capitalize" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {item.category}
                    </Typography>
                    <Divider sx={{ mb: 1 }} />
                    <Typography
                      variant="body1"
                      sx={{ color: "#00796b", fontWeight: "bold", mb: 2 }}
                    >
                      ₹{item.price}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff7043",
                        "&:hover": { backgroundColor: "#e64a19" },
                      }}
                      onClick={() => addToCart(item)}
                      fullWidth
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary">
              No items available in this category.
            </Typography>
          )}
        </Grid>

        {/* 🔹 Place Order Button */}
        {cart.length > 0 && (
          <Box textAlign="center" mt={5}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
                backgroundColor: "#00796b",
                "&:hover": { backgroundColor: "#004d40" },
              }}
              onClick={placeOrder}
            >
              Place Order
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CustomerMenu;
