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
} from "@mui/material";
import API from "../api/api";

const AddMenu = () => {
  const [menuData, setMenuData] = useState({
    name: "",
    price: "",
    category: "",
    img: null,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // handle text and select input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prev) => ({ ...prev, [name]: value }));
  };

  // handle file input
  const handleFileChange = (e) => {
    setMenuData((prev) => ({ ...prev, img: e.target.files[0] }));
  };

  // submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", menuData.name);
      formData.append("price", menuData.price);
      formData.append("category", menuData.category);
      if (menuData.img) formData.append("img", menuData.img);

      const res = await API.post("/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Menu item added successfully!");
      setSeverity("success");
      setOpenSnackbar(true);

      // reset form
      setMenuData({
        name: "",
        price: "",
        category: "",
        img: null,
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add menu item.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Add Menu Item
      </Typography>

      <Card sx={{ maxWidth: 500, p: 2 }}>
        <CardContent>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Food Name"
                  name="name"
                  value={menuData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
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

              <Grid item xs={12}>
                <TextField
                  select
                  label="Category"
                  name="category"
                  value={menuData.category}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Starter">Starter</MenuItem>
                  <MenuItem value="Main Course">Main Course</MenuItem>
                  <MenuItem value="Dessert">Dessert</MenuItem>
                  <MenuItem value="Beverages">Beverages</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
                {menuData.img && (
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {menuData.img.name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Add Menu
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
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
    </div>
  );
};

export default AddMenu;
