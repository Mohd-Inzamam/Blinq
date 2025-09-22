import React, { useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { BASEURL } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const ShortenURLForm = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [shortURL, setShortURL] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const { token } = useAuth();

  const validate = () => {
    const errors = {};
    if (!originalURL.trim()) errors.originalURL = "URL is required";
    else if (!/^https?:\/\/.+/i.test(originalURL.trim()))
      errors.originalURL = "URL must start with http:// or https://";

    if (customAlias && !/^[a-zA-Z0-9_-]{1,30}$/.test(customAlias))
      errors.customAlias =
        "Alias can only contain letters, numbers, underscores, dashes (max 30 chars)";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError({});
    setShortURL("");

    try {
      const payload = {
        originalUrl: originalURL.trim(),
        customAlias: customAlias.trim() || undefined,
      };

      const response = await fetch(`${BASEURL}/api/v1/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type");
      let data = {};
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Server returned invalid response");
      }

      if (!response.ok)
        setError({ api: data.message || "Something went wrong." });
      else setShortURL(`${BASEURL}/${data.shortCode}`);
    } catch (err) {
      setError({ api: err.message || "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL);
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}>
      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}>
          <TextField
            fullWidth
            label="Original URL"
            value={originalURL}
            onChange={(e) => setOriginalURL(e.target.value)}
            error={!!error.originalURL}
            helperText={error.originalURL}
            margin="normal"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}>
          <TextField
            fullWidth
            label="Custom Alias (optional)"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            error={!!error.customAlias}
            helperText={error.customAlias}
            margin="normal"
          />
        </motion.div>

        {error.api && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{ color: "red", marginTop: 10 }}>
            {error.api}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#EE6123",
              "&:hover": {
                backgroundColor: "#cc4f1a",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
            fullWidth
            disabled={loading}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Shorten"
            )}
          </Button>
        </motion.div>
      </form>

      {loading && (
        <Skeleton
          variant="rectangular"
          height={50}
          sx={{ borderRadius: 2, mt: 2 }}
        />
      )}

      {shortURL && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 15px",
            background: "#f5f5f5",
            borderRadius: "8px",
          }}>
          <span>{shortURL}</span>
          <IconButton onClick={handleCopy}>
            <ContentCopyIcon />
          </IconButton>
        </motion.div>
      )}

      {/* Animated toast */}
      <AnimatePresence>
        {toastOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#4caf50",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              zIndex: 9999,
            }}>
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShortenURLForm;
