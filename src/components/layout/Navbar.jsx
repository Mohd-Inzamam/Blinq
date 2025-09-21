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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  // Drawer toggle (for mobile)
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Profile menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  // Center nav links (desktop)
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
        {navLinks.map((item) => (
          <ListItem key={item.label} disablePadding>
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
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid #E5E5E5",
          boxShadow: "none",
        }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left - Logo */}
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

          {/* Center - Nav links (desktop only) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              flexGrow: 1,
              justifyContent: "center",
            }}>
            {navLinks.map((item) => (
              <Typography
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  textDecoration: "none",
                  color: "text.primary",
                  fontSize: "16px",
                  "&:hover": {
                    color: "secondary.main",
                    textDecoration: "underline",
                  },
                }}>
                {item.label}
              </Typography>
            ))}
          </Box>

          {/* Right - Auth buttons / Profile */}
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
                {/* <Button component={Link} to="/dashboard" color="primary">
                  Dashboard
                </Button> */}

                {/* Avatar + Name (acts as menu trigger) */}
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
                  <Typography sx={{ ml: 1, fontSize: "16px", fontWeight: 500 }}>
                    {user?.name || "User"}
                  </Typography>
                </Box>

                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}>
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

            {/* Mobile hamburger */}
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

      {/* Drawer for mobile nav */}
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

// // src/components/layout/Navbar.jsx

// import { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Avatar,
//   Menu,
//   MenuItem,
//   Divider,
//   ListItemButton,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const navigate = useNavigate();
//   const { isAuthenticated, logout, user } = useAuth();

//   // Drawer toggle (for mobile)
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   // Profile menu
//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     handleMenuClose();
//     logout();
//     navigate("/login");
//   };

//   // Center nav links (desktop)
//   const navLinks = [
//     { label: "Features", path: "/features" },
//     { label: "Pricing", path: "/pricing" },
//     { label: "Resources", path: "/resources" },
//   ];

//   const drawer = (
//     <Box sx={{ width: 250, p: 2 }}>
//       <Typography
//         variant="h6"
//         sx={{ color: "primary.main", mb: 2, cursor: "pointer" }}
//         onClick={() => {
//           navigate("/");
//           setMobileOpen(false);
//         }}>
//         Blinq
//       </Typography>
//       <Divider />
//       <List>
//         {navLinks.map((item) => (
//           <ListItem key={item.label} disablePadding>
//             <ListItemButton
//               component={Link}
//               to={item.path}
//               onClick={() => setMobileOpen(false)}>
//               <ListItemText
//                 primary={item.label}
//                 primaryTypographyProps={{
//                   sx: {
//                     fontSize: "16px",
//                     color: "text.primary",
//                     "&:hover": { color: "secondary.main" },
//                   },
//                 }}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       {/* <List>
//         {navLinks.map((item) => (
//           <ListItem
//             button
//             key={item.label}
//             component={Link}
//             to={item.path}
//             onClick={() => setMobileOpen(false)}>
//             <ListItemText
//               primary={item.label}
//               primaryTypographyProps={{
//                 sx: {
//                   fontSize: "16px",
//                   color: "text.primary",
//                   "&:hover": { color: "secondary.main" },
//                 },
//               }}
//             />
//           </ListItem>
//         ))}
//       </List> */}
//     </Box>
//   );

//   return (
//     <>
//       <AppBar
//         position="static"
//         sx={{
//           backgroundColor: "background.paper",
//           color: "text.primary",
//           borderBottom: "1px solid #E5E5E5",
//           boxShadow: "none",
//         }}>
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//           {/* Left - Logo */}
//           <Typography
//             variant="h6"
//             component={Link}
//             to="/"
//             sx={{
//               color: "primary.main",
//               textDecoration: "none",
//               fontWeight: 700,
//               fontSize: "20px",
//             }}>
//             Blinq
//           </Typography>

//           {/* Center - Nav links (desktop only) */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               gap: 3,
//               flexGrow: 1,
//               justifyContent: "center",
//             }}>
//             {navLinks.map((item) => (
//               <Typography
//                 key={item.label}
//                 component={Link}
//                 to={item.path}
//                 sx={{
//                   textDecoration: "none",
//                   color: "text.primary",
//                   fontSize: "16px",
//                   "&:hover": {
//                     color: "secondary.main",
//                     textDecoration: "underline",
//                   },
//                 }}>
//                 {item.label}
//               </Typography>
//             ))}
//           </Box>

//           {/* Right - Auth buttons / Profile */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             {!isAuthenticated ? (
//               <>
//                 <Button
//                   component={Link}
//                   to="/login"
//                   variant="outlined"
//                   color="primary">
//                   Log In
//                 </Button>
//                 <Button
//                   component={Link}
//                   to="/signup"
//                   variant="contained"
//                   color="primary">
//                   Sign Up
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button component={Link} to="/dashboard" color="primary">
//                   Dashboard
//                 </Button>
//                 <IconButton onClick={handleMenuOpen}>
//                   <Avatar sx={{ bgcolor: "primary.main" }}>
//                     {user?.name?.[0]?.toUpperCase() || "U"}
//                   </Avatar>
//                 </IconButton>
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}>
//                   <MenuItem component={Link} to="/profile">
//                     Profile
//                   </MenuItem>
//                   <MenuItem component={Link} to="/settings">
//                     Settings
//                   </MenuItem>
//                   <MenuItem onClick={handleLogout}>Logout</MenuItem>
//                 </Menu>
//               </>
//             )}

//             {/* Mobile hamburger */}
//             <IconButton
//               color="inherit"
//               edge="end"
//               sx={{ display: { md: "none" } }}
//               onClick={handleDrawerToggle}>
//               <MenuIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer for mobile nav */}
//       <Drawer
//         anchor="left"
//         open={mobileOpen}
//         onClose={handleDrawerToggle}
//         ModalProps={{ keepMounted: true }}>
//         {drawer}
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;
