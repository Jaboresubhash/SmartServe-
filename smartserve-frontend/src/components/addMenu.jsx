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
  CardContent,
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
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #f9fafb, #e0f7fa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: 900,
          width: "100%",
          borderRadius: 3,
          boxShadow: 5,
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        {/* LEFT SIDE - IMAGE */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            p: 3,
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ) : (
            <Typography variant="subtitle1" color="textSecondary">
              No image uploaded
            </Typography>
          )}

          <Button
            variant="outlined"
            component="label"
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: 600,
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

        {/* RIGHT SIDE - FORM */}
        <Box sx={{ flex: 2, p: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
              textAlign: "center",
              color: "#333",
            }}
          >
            Add Menu Item
          </Typography>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Food Name"
                  name="name"
                  value={menuData.name}
                  onChange={handleChange}
                  fullWidth
                  required
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
                />
              </Grid>

  
            </Grid>
            <Grid >
                          {/* Row 2 */}
              <Grid spacing={1}>
                <TextField
                  select
                  label="Category"
                  name="category"
                  value={menuData.category}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Tiffins">Tiffins</MenuItem>
                  <MenuItem value="Main Course">Main Course</MenuItem>
                  <MenuItem value="Dessert">Dessert</MenuItem>
                  <MenuItem value="Beverages">Beverages</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.4,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Add Menu
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Card>

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

