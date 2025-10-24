// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { Typography, Card, CardContent, Grid, Button } from "@mui/material";

// const StaffOrders = () => {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = () => {
//     API.get("/orders")
//       .then((res) => setOrders(res.data))
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const markPrepared = (id) => {
//     API.put(`/orders/${id}`, { status: "Preparing" }).then(fetchOrders);
//   };

//   const markServed = (id) => {
//     API.put(`/orders/${id}`, { status: "Served" }).then(fetchOrders);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <Typography variant="h4">Staff Orders</Typography>
//       <Grid container spacing={2}>
//         {orders.map((order) => (
//           <Grid item xs={12} sm={6} md={4} key={order.id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">Table: {order.table_no}</Typography>
//                 <Typography>Status: {order.status}</Typography>
//                 <ul>
//                   {order.items.map((item, index) => (
//                     <li key={index}>
//                       {item.name} x {item.qty}
//                     </li>
//                   ))}
//                 </ul>
//                 <Button variant="contained" onClick={() => markPrepared(order.id)}>
//                   Mark Preparing
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="success"
//                   onClick={() => markServed(order.id)}
//                   style={{ marginLeft: 10 }}
//                 >
//                   Mark Served
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default StaffOrders;
import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Typography, Card, CardContent, Grid, Button, Box } from "@mui/material";

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
    <Box
      sx={{
        padding: 4,
        background: "linear-gradient(135deg, #f9fafb, #e0f7fa)",
        minHeight: "100vh",
        width:"94vw"
      }}
    >
      {/* HEADER */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#00796b", mb: 1 }}
        >
          🍴 Welcome to SmartServe Restaurant
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

              <Box sx={{ display: "flex", p: 2, gap: 1 }}>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={() => markPrepared(order.id)}
                >
                  Mark Preparing
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => markServed(order.id)}
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
