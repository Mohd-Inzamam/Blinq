// src/components/resources/ResourceCard.jsx

import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ResourceCard = ({ title, description, image, link }) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
        },
      }}
      onClick={() => window.open(link, "_blank")}>
      {image && (
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
          sx={{
            objectFit: "cover",
          }}
        />
      )}

      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#222", mb: 1 }}>
          {title}
        </Typography>

        <Typography sx={{ color: "#555", fontSize: "15px", lineHeight: 1.6 }}>
          {description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            color: "#EE6123",
            fontWeight: 600,
            fontSize: "15px",
          }}>
          Read More <ArrowForwardIcon sx={{ ml: 0.5, fontSize: "18px" }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
