// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Grid,
//   MenuItem,
//   Card,
//   CardContent,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import API from "../api/api";

// const AddMenu = () => {
//   const [menuData, setMenuData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     img: null,
//   });

//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [message, setMessage] = useState("");
//   const [severity, setSeverity] = useState("success");

//   // handle text and select input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMenuData((prev) => ({ ...prev, [name]: value }));
//   };

//   // handle file input
//   const handleFileChange = (e) => {
//     setMenuData((prev) => ({ ...prev, img: e.target.files[0] }));
//   };

//   // submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("name", menuData.name);
//       formData.append("price", menuData.price);
//       formData.append("category", menuData.category);
//       if (menuData.img) formData.append("img", menuData.img);

//       const res = await API.post("/menu", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage("Menu item added successfully!");
//       setSeverity("success");
//       setOpenSnackbar(true);

//       // reset form
//       setMenuData({
//         name: "",
//         price: "",
//         category: "",
//         img: null,
//       });
//     } catch (error) {
//       console.error(error);
//       setMessage("Failed to add menu item.");
//       setSeverity("error");
//       setOpenSnackbar(true);
//     }
//   };

//   return (
//     <div style={{ padding: 20 ,
//        display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           backgroundColor:"red    "
//     }}>

//       <Card sx={{
//           maxWidth: 500,
//           p: 2 ,
//           backgroundPosition: "center",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//          backgroundColor:"DarkGray",
//           textAlign: "center",}}>
//         <Typography variant="h4" gutterBottom>
//         Add Menu Item
//       </Typography>
//         <CardContent>
//           <form onSubmit={handleSubmit} encType="multipart/form-data">
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Food Name"
//                   name="name"
//                   value={menuData.name}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   label="Price (₹)"
//                   name="price"
//                   type="number"
//                   value={menuData.price}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 />
//               </Grid>

//               <Grid item xs={12} sx={{width:'224px'}}>
//                 <TextField
//                   select
//                   label="Category"
//                   name="category"
//                   value={menuData.category}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                 >
//                   <MenuItem value="Tiffins">Tiffins</MenuItem>
//                   <MenuItem value="Main Course">Main Course</MenuItem>
//                   <MenuItem value="Dessert">Dessert</MenuItem>
//                   <MenuItem value="Beverages">Beverages</MenuItem>
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sx={{width:'224px' , height:'80px'}}>
//                 <Button variant="outlined" component="label" fullWidth>
//                   Upload Image
//                   <input
//                     type="file"
//                     accept="image/*"
//                     hidden
//                     onChange={handleFileChange}
//                   />
//                 </Button>
//                 {menuData.img && (
//                   <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                     {menuData.img.name}
//                   </Typography>
//                 )}
//               </Grid>


//             </Grid>
//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   type="submit"
//                   fullWidth
//                 >
//                   Add Menu
//                 </Button>
//               </Grid>
//           </form>
//         </CardContent>
//       </Card>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setOpenSnackbar(false)}
//       >
//         <Alert severity={severity} onClose={() => setOpenSnackbar(false)}>
//           {message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default AddMenu;
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Card,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import API from "../api/api";

const AddMenu = () => {
  const [menuData, setMenuData] = useState({
    name: "",
    price: "",
    category: "",
    img: null,
  });

  const [preview, setPreview] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMenuData((prev) => ({ ...prev, img: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", menuData.name);
      formData.append("price", menuData.price);
      formData.append("category", menuData.category);
      if (menuData.img) formData.append("img", menuData.img);

      await API.post("/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Menu item added successfully!");
      setSeverity("success");
      setOpenSnackbar(true);

      setMenuData({
        name: "",
        price: "",
        category: "",
        img: null,
      });
      setPreview(null);
    } catch (error) {
      console.error(error);
      setMessage("Failed to add menu item.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "96vw",
        background: "linear-gradient(135deg, #fef6e4, #e8f5e9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 6,
        px: 2,
      }}
    >
      {/* 🌟 Header Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: "#2e7d32",
            textShadow: "2px 2px #a5d6a7",
          }}
        >
          🍴 SmartServe Restaurant
        </Typography>
        <Typography
          variant="h6"
          sx={{ mt: 1, color: "#555", fontStyle: "italic" }}
        >
          Welcome Chef! Add your delicious creations to the menu 🍛
        </Typography>
      </Box>

      {/* 💳 Main Card Section */}
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "90%",
          maxWidth: 950,
          borderRadius: 4,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          bgcolor: "#fff",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {/* 🖼️ LEFT SIDE - Image Section */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#fafafa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 3,
            borderRight: { md: "1px solid #ddd" },
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ) : (
            <Typography variant="subtitle1" color="textSecondary">
              No image uploaded yet
            </Typography>
          )}

          <Button
            variant="outlined"
            component="label"
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            {preview ? "Change Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
        </Box>

        {/* 🧾 RIGHT SIDE - Form Section */}
        <Box
          sx={{
            flex: 2,
            p: { xs: 3, md: 5 },
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
              textAlign: "center",
              color: "#1b5e20",
              letterSpacing: 1,
            }}
          >
            Add Menu Item
          </Typography>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Food Name"
                  name="name"
                  value={menuData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price (₹)"
                  name="price"
                  type="number"
                  value={menuData.price}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12} width={480}>
                <TextField
                  select
                  label="Category"
                  name="category"
                  value={menuData.category}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                >
                  <MenuItem value="Tiffins">Tiffins</MenuItem>
                  <MenuItem value="Main Course">Main Course</MenuItem>
                  <MenuItem value="Dessert">Dessert</MenuItem>
                  <MenuItem value="Beverages">Beverages</MenuItem>
                </TextField>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} width={480}>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.3,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: 2,
                    boxShadow: "0 4px 10px rgba(46,125,50,0.3)",
                    "&:hover": {
                      backgroundColor: "#2e7d32",
                    },
                  }}
                >
                  ➕ Add to Menu
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>

      {/* ✅ Snackbar for success/error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={severity} onClose={() => setOpenSnackbar(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddMenu;
