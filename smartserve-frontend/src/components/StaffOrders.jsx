import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Typography, Card, CardContent, Grid, Button } from "@mui/material";

const StaffOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    API.get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markPrepared = (id) => {
    API.put(`/orders/${id}`, { status: "Preparing" }).then(fetchOrders);
  };

  const markServed = (id) => {
    API.put(`/orders/${id}`, { status: "Served" }).then(fetchOrders);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4">Staff Orders</Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Table: {order.table_no}</Typography>
                <Typography>Status: {order.status}</Typography>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} x {item.qty}
                    </li>
                  ))}
                </ul>
                <Button variant="contained" onClick={() => markPrepared(order.id)}>
                  Mark Preparing
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => markServed(order.id)}
                  style={{ marginLeft: 10 }}
                >
                  Mark Served
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default StaffOrders;
