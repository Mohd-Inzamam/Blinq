// src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./components/layout/Navbar";
import SignUpPage from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./components/layout/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import theme from "./theme";
import ShortenURLForm from "./pages/dashboard/ShortenURLForm";
// import Home from "./components/common/Home";

function App() {
  const { user } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Navbar always visible */}
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <SignUpPage />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Nested routes */}
        <Route path="shorten" element={<ShortenURLForm />} />


        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider >
  );
}

export default App;

