import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8B0000",        // Wine Red
      dark: "#600000",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFA726",        // Gold Orange
      dark: "#FB8C00",
      contrastText: "#fff",
    },
    background: {
      default: "#FDF3E7",     // Cream background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2B2B2B",     // Charcoal black
      secondary: "#555555",
    },
  },

  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    button: { fontWeight: 600 },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 18px",
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#8B0000", // Wine Red
        },
      },
    },
  },
});

export default theme;
