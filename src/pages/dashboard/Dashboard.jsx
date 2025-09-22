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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                "&.active": {
                  borderLeft: "4px solid #EE6123",
                  bgcolor: "action.hover",
                },
              }}
              className={location.pathname === item.path ? "active" : ""}>
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
          background: "linear-gradient(120deg, #fdfdfd, #f9f9f9)",
          minHeight: "100vh",
        }}>
        {/* Topbar mobile menu button */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{
              mb: 2,
              transition: "transform 0.3s",
              transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)",
            }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Dashboard cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}>
          {/* Shorten Link Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}>
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
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "#dd5015",
                    },
                  }}
                  onClick={() => navigate("/shorten")}>
                  Shorten Link
                </Button>
              </CardActions>
            </Card>
          </motion.div>

          {/* View Analytics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}>
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
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      borderColor: "#EE6123",
                    },
                  }}>
                  View Analytics
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

// // src/pages/Dashboard.jsx
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   CardActions,
//   Button,
//   Divider,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const { user } = useAuth();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const navigate = useNavigate();

//   const navItems = [
//     { label: "Links", path: "/dashboard/links" },
//     { label: "Analytics", path: "/dashboard/analytics" },
//     { label: "Profile", path: "/dashboard/profile" },
//   ];

//   const drawer = (
//     <Box sx={{ width: 240, p: 2 }}>
//       <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
//         Dashboard
//       </Typography>
//       <Divider sx={{ mb: 2 }} />
//       <List>
//         {navItems.map((item) => (
//           <ListItem key={item.label} disablePadding>
//             <ListItemButton component={Link} to={item.path}>
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
//     </Box>
//   );

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       {/* Sidebar */}
//       {!isMobile && (
//         <Box
//           component="nav"
//           sx={{
//             width: 240,
//             flexShrink: 0,
//             borderRight: "1px solid #E5E5E5",
//           }}>
//           {drawer}
//         </Box>
//       )}

//       {/* Mobile Drawer */}
//       {isMobile && (
//         <Drawer
//           anchor="left"
//           open={mobileOpen}
//           onClose={() => setMobileOpen(false)}
//           ModalProps={{ keepMounted: true }}>
//           {drawer}
//         </Drawer>
//       )}

//       {/* Main content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           backgroundColor: "background.default",
//           minHeight: "100vh",
//         }}>
//         {/* Topbar mobile menu button */}
//         {isMobile && (
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={() => setMobileOpen(true)}
//             sx={{ mb: 2 }}>
//             <MenuIcon />
//           </IconButton>
//         )}

//         {/* Dashboard cards */}
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
//             gap: 3,
//           }}>
//           {/* Shorten Link Card */}
//           <Card
//             sx={{
//               p: 2,
//               borderRadius: 3,
//               boxShadow: 3,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 1 }}>
//                 Shorten your first link
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Start by shortening any URL and track clicks in real time.
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 onClick={() => navigate("/shorten")}>
//                 Shorten Link
//               </Button>
//             </CardActions>
//           </Card>

//           {/* View Analytics Card */}
//           <Card
//             sx={{
//               p: 2,
//               borderRadius: 3,
//               boxShadow: 3,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 1 }}>
//                 View Analytics
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Monitor your link performance and get insights at a glance.
//               </Typography>
//             </CardContent>
//             <CardActions>
//               <Button variant="outlined" color="primary" fullWidth>
//                 View Analytics
//               </Button>
//             </CardActions>
//           </Card>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;
