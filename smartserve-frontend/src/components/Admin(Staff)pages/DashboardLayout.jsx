import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", height: "41vw",width: "100vw", bgcolor: "#f5f6fa" }}>
      {/* ===== Left Sidebar ===== */}
      <Box
        sx={{
          width: 250,
          bgcolor: "#2c3e50",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: 3,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              py: 3,
              fontWeight: "bold",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            🍽 SmartServe
          </Typography>

          <List>
            <ListItem button onClick={() => navigate("/dashboard/addmenu")}>
              <MenuBookIcon sx={{ mr: 2 }} />
              <ListItemText primary="Add Menu" />
            </ListItem>

            <ListItem button onClick={() => navigate("/dashboard/adminmenu")}>
              <EditNoteIcon sx={{ mr: 2 }} />
              <ListItemText primary="Manage Menu" />
            </ListItem>

            <ListItem button onClick={() => navigate("/dashboard/orders")}>
              <ReceiptLongIcon sx={{ mr: 2 }} />
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
        </Box>

        <Box>
          <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />
          <ListItem button onClick={() => navigate("/")}>
            <LogoutIcon sx={{ mr: 2 }} />
            <ListItemText primary="Logout" />
          </ListItem>
        </Box>
      </Box>

      {/* ===== Right Content (Dynamic Area) ===== */}
      <Box sx={{ flexGrow: 1, p: 4, overflowY: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
