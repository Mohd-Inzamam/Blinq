// src/components/pricing/FeatureBlock.jsx

import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const FeatureBlock = ({ icon, title, description }) => {
  /**
   * Props:
   * icon → MUI icon element OR custom icon
   * title → string
   * description → string
   */

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
        background: "#fff",
        padding: 3,
        borderRadius: "12px",
        border: "1px solid var(--border-color)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        transition: "0.3s ease",
        "&:hover": {
          boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
          transform: "translateY(-3px)",
        },
      }}>
      {/* Icon */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "10px",
          background: "rgba(238, 97, 35, 0.1)", // light Bitly orange tint
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
        {icon || (
          <CheckCircleRoundedIcon
            sx={{ color: "var(--primary-color)", fontSize: 28 }}
          />
        )}
      </Box>

      {/* Text Content */}
      <Box>
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#222",
            mb: 0.5,
          }}>
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            color: "#555",
            lineHeight: 1.6,
          }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeatureBlock;
