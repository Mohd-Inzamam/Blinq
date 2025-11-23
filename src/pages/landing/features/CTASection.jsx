// src/components/pricing/CTASection.jsx

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = ({
  title = "Ready to get started?",
  subtitle = "Join Blinq today and start creating smarter, trackable links.",
  buttonText = "Get Started",
  buttonLink = "/signup",
}) => {
  return (
    <Box
      sx={{
        maxWidth: "900px",
        textAlign: "center",
        margin: "80px auto",
        padding: "60px 30px",
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid var(--border-color)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: "#222",
          mb: 2,
        }}>
        {title}
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          fontSize: "16px",
          color: "#555",
          mb: 4,
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: 1.7,
        }}>
        {subtitle}
      </Typography>

      {/* CTA Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          component={Link}
          to={buttonLink}
          variant="contained"
          color="primary"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            padding: "14px 30px",
            borderRadius: "10px",
            textTransform: "none",
          }}>
          {buttonText}
        </Button>
      </motion.div>
    </Box>
  );
};

export default CTASection;
