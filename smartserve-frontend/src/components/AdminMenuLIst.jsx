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
} from "@mui/material";
import API from "../api/api";

const AdminMenuList = () => {
  const [menu, setMenu] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
const [formData, setFormData] = useState({
  name: "",
  price: "",
  category: "",
  image: null, // for uploaded file
});

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
    image: item.image || null, // existing image
  });
  setOpen(true);
};


  const handleUpdate = async () => {
    try {
      await API.put(`/menu/${selectedItem.id}`, formData);
      setOpen(false);
      fetchMenu();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        🍴 Admin Menu Management
      </Typography>

      <Grid container spacing={2}>
        {menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ p: 2 }}>
              {item.image && (
                <CardMedia
                  component="img"
                  height="180"
                  image={`http://localhost:3001/uploads/${item.image}`}
                  alt={item.name}
                />
              )}
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="text.secondary">
                  ₹{item.price}
                </Typography>
                <div style={{ marginTop: 10 }}>
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
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Menu Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <TextField
            label="Price"
            fullWidth
            margin="dense"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
             <TextField
            label="category"
            fullWidth
            margin="dense"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
          <TextField
            label="Image Name"
            fullWidth
            margin="dense"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminMenuList;
