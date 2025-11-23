import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { motion } from "framer-motion";

const PricingToggle = ({ billing, setBilling }) => {
  const handleChange = (event, newValue) => {
    if (newValue !== null) setBilling(newValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <ToggleButtonGroup
        value={billing}
        exclusive
        onChange={handleChange}
        sx={{
          backgroundColor: "white",
          borderRadius: "30px",
          p: 0.5,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          "& .MuiToggleButton-root": {
            px: 3,
            py: 1,
            border: "none",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            color: "text.secondary",
            borderRadius: "30px",
          },
          "& .Mui-selected": {
            backgroundColor: "primary.main !important",
            color: "white !important",
          },
          "& .MuiToggleButton-root:hover": {
            backgroundColor: "#f1f1f1",
          },
        }}>
        <ToggleButton value="monthly">Monthly</ToggleButton>
        <ToggleButton value="yearly">Yearly</ToggleButton>
      </ToggleButtonGroup>
    </motion.div>
  );
};

export default PricingToggle;
