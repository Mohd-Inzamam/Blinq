// src/components/pricing/FeatureComparisonTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const defaultPlans = [
  { name: "Free", highlight: false },
  { name: "Pro", highlight: true },
  { name: "Business", highlight: false },
];

const defaultFeatures = [
  { label: "Custom Domains", values: [false, true, true] },
  { label: "Advanced Analytics", values: [false, true, true] },
  { label: "API Access", values: [false, true, true] },
];

const FeatureComparisonTable = ({
  plans = defaultPlans,
  features = defaultFeatures,
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      {/* Heading moved to page; keep small spacing */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
          overflowX: "auto",
        }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: 700,
                  color: "#333",
                  background: "#fafafa",
                  position: "sticky",
                  left: 0,
                  zIndex: 2,
                }}>
                Features
              </TableCell>

              {plans.map((plan, idx) => (
                <TableCell
                  key={idx}
                  align="center"
                  sx={{
                    fontWeight: 700,
                    background: plan.highlight
                      ? "rgba(238,97,35,0.06)"
                      : "#fafafa",
                    color: plan.highlight ? "var(--color-primary)" : "#333",
                    borderLeft: "1px solid var(--border-color)",
                  }}>
                  {plan.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {features.map((feature, rowIdx) => (
              <TableRow key={rowIdx}>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    color: "#222",
                    background: "#fff",
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                  }}>
                  {feature.label}
                </TableCell>

                {feature.values.map((value, colIdx) => (
                  <TableCell
                    key={colIdx}
                    align="center"
                    sx={{
                      borderLeft: "1px solid var(--border-color)",
                      color: value ? "var(--color-primary)" : "#999",
                      fontWeight: value ? 600 : 400,
                      fontSize: "15px",
                    }}>
                    {value ? <CheckIcon /> : "—"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        sx={{ textAlign: "center", mt: 2, fontSize: "14px", color: "#777" }}>
        Scroll horizontally to view more plans
      </Typography>
    </Box>
  );
};

export default FeatureComparisonTable;
