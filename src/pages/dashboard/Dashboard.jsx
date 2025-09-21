// src/pages/Dashboard.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Links", path: "/dashboard/links" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Profile", path: "/dashboard/profile" },
  ];

  const drawer = (
    <Box sx={{ width: 240, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
        Dashboard
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "16px",
                    color: "text.primary",
                    "&:hover": { color: "secondary.main" },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      {!isMobile && (
        <Box
          component="nav"
          sx={{
            width: 240,
            flexShrink: 0,
            borderRight: "1px solid #E5E5E5",
          }}>
          {drawer}
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}>
          {drawer}
        </Drawer>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "background.default",
          minHeight: "100vh",
        }}>
        {/* Topbar mobile menu button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileOpen(true)}
            sx={{ mb: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Welcome message */}
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          Welcome back, {user?.name || "User"} 👋
        </Typography>

        {/* Dashboard cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}>
          {/* Shorten Link Card */}
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Shorten your first link
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Start by shortening any URL and track clicks in real time.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate("/shorten")}>
                Shorten Link
              </Button>
            </CardActions>
          </Card>

          {/* View Analytics Card */}
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                View Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor your link performance and get insights at a glance.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" color="primary" fullWidth>
                View Analytics
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
