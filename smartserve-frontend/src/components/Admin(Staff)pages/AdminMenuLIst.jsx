import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import API from "../../api/api";

const AdminMenuList = () => {
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    img: null,
  });

  // Categories — you can edit these
  const categories = [
    "Starters",
    "Main Course",
    "Desserts",
    "Drinks",
    "Roti & Tandoori",
  ];

  // Fetch all menu items
  const fetchMenu = async () => {
    try {
      const res = await API.get("/menu");
      setMenu(res.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Delete menu item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await API.delete(`/menu/${id}`);
        fetchMenu();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      img: null, // reset file
    });
    setOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("price", formData.price);
      updateData.append("category", formData.category);

      if (formData.img instanceof File) {
        updateData.append("img", formData.img);
      }

      await API.put(`/menu/${selectedItem.id}`, updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOpen(false);
      fetchMenu();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
        🍴 Admin Menu Management
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              {item.img && (
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000/uploads/${item.img}`}
                  alt={item.name}
                />
              )}
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Category: <b>{item.category}</b>
                </Typography>
                <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                  ₹{item.price}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(item)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "#1976d2",
            color: "white",
          }}
        >
          Edit Menu Item
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            label="Price"
            fullWidth
            margin="dense"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />

          {/* Category Dropdown */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              label="Category"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, img: e.target.files[0] })}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "8px",
                width: "100%",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={() => setOpen(false)} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminMenuList;
