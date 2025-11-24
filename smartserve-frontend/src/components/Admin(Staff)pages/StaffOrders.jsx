
import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Typography, Card, CardContent, Grid, Button, Box } from "@mui/material";
import '@fortawesome/fontawesome-free/css/all.min.css';


const StaffOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Update order status (instant UI update)
  const updateOrderStatus = async (id, newStatus) => {
    try {
      await API.put(`/orders/${id}`, { status: newStatus });

      // Update UI immediately without re-fetch
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        paddingRight:0,
        // background: "linear-gradient(135deg, #f9fafb, #e0f7fa)",
        minHeight: "100vh",
        width:"74vw"
      }}
    >
      {/* HEADER */}
      <Box sx={{ textAlign: "center", mb: 3 ,}}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#00796b", mb: 1 }}
        >
          <i class="fa-brands fa-web-awesome"></i> Welcome to SmartServe Restaurant
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage and update your table orders here
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{display: "flex",}}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id} >
            <Card
              sx={{
                height: "100%", 
                width:"20vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 4,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                  Table: {order.table_no}
                </Typography>
                <Typography
                  sx={{
                    mb: 2,
                    color:
                      order.status === "Served"
                        ? "green"
                        : order.status === "Preparing"
                        ? "orange"
                        : "blue",
                    fontWeight: "600",
                  }}
                >
                  Status: {order.status}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Items:
                </Typography>
                <ul style={{ paddingLeft: 20 }}>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} x {item.qty}
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* BUTTONS */}
                <Box sx={{ display: "flex", p: 2, gap: 1 }}>
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={() => updateOrderStatus(order.id, "Preparing")}
                    disabled={order.status === "Preparing" || order.status === "Served"}
                  >
                    Mark Preparing
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={() => updateOrderStatus(order.id, "Served")}
                    disabled={order.status === "Served"}
                  >
                    Mark Served
                  </Button>
                </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StaffOrders;
