// src/components/common/SectionContainer.jsx

import React from "react";
import { Box } from "@mui/material";

const SectionContainer = ({
  children,
  maxWidth = "1200px",
  paddingY = "80px",
  paddingX = "20px",
  background = "transparent",
  id,
  sx = {},
}) => {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background,
        py: paddingY,
        px: paddingX,
      }}>
      <Box
        sx={{
          width: "100%",
          maxWidth,
          ...sx,
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default SectionContainer;
