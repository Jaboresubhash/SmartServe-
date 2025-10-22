import React, { useEffect, useState } from "react";
import API from "../api/api";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
} from "@mui/material";

const CustomerMenu = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableNo, setTableNo] = useState("");

  useEffect(() => {
    API.get("/menu")
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (item) => {
    setCart([...cart, { ...item, qty: 1 }]);
  };

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
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Customer Menu
      </Typography>

      <TextField
        label="Table Number"
        value={tableNo}
        onChange={(e) => setTableNo(e.target.value)}
        sx={{ marginBottom: 3 }}
      />

      <Grid container spacing={3}>
        {menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              {/* ✅ Image section */}
              {item.img && (
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000/uploads/${item.img}`}
                  alt={item.name}
                />
              )}

              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {item.category}
                </Typography>
                <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
                  ₹{item.price}
                </Typography>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => addToCart(item)}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={placeOrder}
        disabled={cart.length === 0}
      >
        Place Order
      </Button>
    </div>
  );
};

export default CustomerMenu;
