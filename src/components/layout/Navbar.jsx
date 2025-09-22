// src/components/layout/Navbar.jsx
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Features", path: "/features" },
    { label: "Pricing", path: "/pricing" },
    { label: "Resources", path: "/resources" },
  ];

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography
        variant="h6"
        sx={{ color: "primary.main", mb: 2, cursor: "pointer" }}
        onClick={() => {
          navigate("/");
          setMobileOpen(false);
        }}>
        Blinq
      </Typography>
      <Divider />
      <List>
        {navLinks.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}>
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
          </motion.div>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Navbar with slide-down animation */}
      <motion.div
        initial={{ y: -64 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "background.paper",
            color: "text.primary",
            borderBottom: "1px solid #E5E5E5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 1200,
          }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "20px",
                }}>
                Blinq
              </Typography>
            </motion.div>

            {/* Desktop nav links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 4,
                flexGrow: 1,
                justifyContent: "center",
                position: "relative",
              }}>
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Box key={item.label} sx={{ position: "relative" }}>
                    <motion.div
                      whileHover={{ scale: 1.05, color: "#EE6123" }}
                      transition={{ duration: 0.2 }}>
                      <Typography
                        component={Link}
                        to={item.path}
                        sx={{
                          textDecoration: "none",
                          color: isActive ? "#EE6123" : "text.primary",
                          fontSize: "16px",
                          fontWeight: 500,
                          position: "relative",
                          py: 0.5,
                        }}>
                        {item.label}
                      </Typography>
                    </motion.div>

                    {/* Active underline */}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        style={{
                          position: "absolute",
                          height: 2,
                          background: "#EE6123",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          borderRadius: 2,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>

            {/* Auth / Profile */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {!isAuthenticated ? (
                <>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    color="primary">
                    Log In
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    color="primary">
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}>
                    <Box
                      onClick={handleMenuOpen}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}>
                      <Avatar
                        sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </Avatar>
                      <Typography
                        sx={{ ml: 1, fontSize: "16px", fontWeight: 500 }}>
                        {user?.name || "User"}
                      </Typography>
                    </Box>
                  </motion.div>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    MenuListProps={{
                      sx: {
                        p: 1,
                        "& .MuiMenuItem-root": {
                          borderRadius: 1,
                          transition: "all 0.2s ease",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        },
                      },
                    }}>
                    <MenuItem
                      component={Link}
                      to="/terms"
                      onClick={handleMenuClose}>
                      Blinq Terms
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/policies"
                      onClick={handleMenuClose}>
                      Policies
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                  </Menu>
                </>
              )}

              {/* Mobile Hamburger */}
              <IconButton
                color="inherit"
                edge="end"
                sx={{ display: { md: "none" } }}
                onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </motion.div>

      {/* Spacing below Navbar so content doesn’t stick */}
      <Box sx={{ height: "70px" }} />

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
