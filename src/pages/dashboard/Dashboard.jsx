// src/pages/Dashboard.jsx
import { Button, Typography, Box, Paper } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          maxWidth: 500,
          width: "100%",
        }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
          Welcome, {user?.name || "User"} 👋
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
          You are now logged in to Blinq. This page is protected — only
          accessible with a valid JWT.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
    </Box>
  );
}
