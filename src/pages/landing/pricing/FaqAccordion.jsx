// src/components/pricing/FaqAccordion.jsx
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FaqAccordion = ({ faqs = [], items = null }) => {
  const questions = items || faqs || [];

  return (
    <Box sx={{ mt: 4, mb: 6, maxWidth: "900px", margin: "0 auto" }}>
      {questions.map((item, idx) => (
        <Accordion
          key={idx}
          sx={{
            mb: 2,
            border: "1px solid var(--border-color)",
            borderRadius: "12px !important",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={{ color: "var(--color-primary)", fontSize: 28 }}
              />
            }
            sx={{
              background: "#fafafa",
              padding: "16px 24px",
              "& .MuiAccordionSummary-content": { margin: 0 },
            }}>
            <Typography
              sx={{ fontSize: "17px", fontWeight: 600, color: "#222" }}>
              {item.question}
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ padding: "20px 24px" }}>
            <Typography
              sx={{ fontSize: "15px", color: "#555", lineHeight: 1.6 }}>
              {item.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FaqAccordion;
