// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import {
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Grid,
//   TextField,
// } from "@mui/material";

// const CustomerMenu = () => {
//   const [menu, setMenu] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [tableNo, setTableNo] = useState("");

//   useEffect(() => {
//     API.get("/menu")
//       .then((res) => setMenu(res.data))
//       .catch((err) => console.log(err));
//   }, []);

//   const addToCart = (item) => {
//     setCart([...cart, { ...item, qty: 1 }]);
//   };

//   const placeOrder = () => {
//     if (!tableNo) {
//       alert("Enter Table Number");
//       return;
//     }
//     API.post("/orders", { table_no: tableNo, items: cart })
//       .then(() => {
//         alert("Order Placed!");
//         setCart([]);
//         setTableNo("");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div style={{ padding: "2px" }}>
//       <Typography variant="h4" gutterBottom>
//         Customer Menu
//       </Typography>

//       <TextField
//         label="Table Number"
//         value={tableNo}
//         onChange={(e) => setTableNo(e.target.value)}
//         sx={{ marginBottom: 3 }}
//       />

//       <Grid container spacing={3}>
//         {menu.map((item) => (
//           <Grid item xs={12} sm={6} md={4} key={item.id}>
//             <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
//               {/* ✅ Image section */}
//               {item.img && (
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={`http://localhost:5000/uploads/${item.img}`}
//                   alt={item.name}
//                 />
//               )}

//               <CardContent>
//                 <Typography variant="h6">{item.name}</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Category: {item.category}
//                 </Typography>
//                 <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
//                   ₹{item.price}
//                 </Typography>

//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={() => addToCart(item)}
//                   fullWidth
//                 >
//                   Add to Cart
//                 </Button>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ mt: 4 }}
//         onClick={placeOrder}
//         disabled={cart.length === 0}
//       >
//         Place Order
//       </Button>
//     </div>
//   );
// };

// export default CustomerMenu;
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
  Box,
  Divider,
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
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "40px 20px",
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
        🍽️ Our Delicious Menu
      </Typography>

      <Box display="flex" justifyContent="center" mb={4}>
        <TextField
          label="Enter Table Number"
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
          sx={{ width: 300, backgroundColor: "white", borderRadius: 2 }}
        />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              sx={{
                height: 360,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                boxShadow: "0 6px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                backgroundColor: "#fff",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* ✅ Image Section */}
              <CardMedia
                component="img"
                height="180"
                image={
                  item.img
                    ? `http://localhost:5000/uploads/${item.img}`
                    : "https://via.placeholder.com/300x180?text=No+Image"
                }
                alt={item.name}
                sx={{
                  objectFit: "cover",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
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
                  sx={{
                    color: "#00796b",
                    fontWeight: "bold",
                    mb: 2,
                  }}
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
        ))}
      </Grid>

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
  );
};

export default CustomerMenu;
