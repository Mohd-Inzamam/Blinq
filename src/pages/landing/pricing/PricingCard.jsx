// src/components/pricing/PricingCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const PricingCard = ({
  title,
  priceMonthly,
  priceYearly,
  features = [],
  buttonText = "Choose",
  highlighted = false,
  billing = "monthly",
}) => {
  const priceToShow = billing === "yearly" ? priceYearly : priceMonthly;
  // format price (simple)
  const displayPrice =
    priceToShow === "0" || priceToShow === 0 ? "Free" : `$${priceToShow}/mo`;

  return (
    <Card
      className={`pricing-card ${highlighted ? "pricing-card-highlight" : ""}`}
      sx={{
        borderRadius: "16px",
        boxShadow: highlighted
          ? "0 8px 28px rgba(0,0,0,0.15)"
          : "0 4px 16px rgba(0,0,0,0.1)",
        border: highlighted
          ? "2px solid rgba(238,97,35,0.14)"
          : "1px solid var(--border-color)",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        "&:hover": { transform: "translateY(-6px)" },
      }}>
      <CardContent sx={{ padding: "32px" }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#222" }}>
          {title}
        </Typography>

        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: "#222" }}>
          {displayPrice}
        </Typography>

        <Typography sx={{ color: "#555", fontSize: "15px", mb: 3 }}>
          {title === "Free"
            ? "Start with our free plan."
            : `Billed ${billing === "yearly" ? "yearly" : "monthly"}.`}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <div className="pricing-features">
          {features.map((feature, index) => (
            <div
              key={index}
              className="pricing-feature-item"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 12,
              }}>
              <CheckIcon
                sx={{ fontSize: 20, color: "var(--color-primary)", mr: 1 }}
              />
              <Typography sx={{ fontSize: "15px", color: "#333" }}>
                {feature}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>

      <CardActions sx={{ padding: "0 32px 32px 32px" }}>
        <Button
          fullWidth
          variant={highlighted ? "contained" : "outlined"}
          sx={{
            height: "48px",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "15px",
            backgroundColor: highlighted ? "var(--color-primary)" : "#fff",
            color: highlighted ? "#fff" : "var(--color-primary)",
            borderColor: highlighted ? "transparent" : "var(--color-primary)",
            "&:hover": {
              backgroundColor: highlighted
                ? "var(--color-primary-hover)"
                : "#fff",
            },
          }}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PricingCard;
