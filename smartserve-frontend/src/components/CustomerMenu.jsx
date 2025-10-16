import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Button, Card, CardContent, Typography, Grid, TextField } from "@mui/material";

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
      .then((res) => {
        alert("Order Placed!");
        setCart([]);
        setTableNo("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Customer Menu</Typography>
      <TextField
        label="Table Number"
        value={tableNo}
        onChange={(e) => setTableNo(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Grid container spacing={2}>
        {menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Price: ₹{item.price}</Typography>
                <Button variant="contained" onClick={() => addToCart(item)}>
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
        style={{ marginTop: 20 }}
        onClick={placeOrder}
        disabled={cart.length === 0}
      >
        Place Order
      </Button>
    </div>
  );
};

export default CustomerMenu;
