// src/pages/dashboard/ShortenURLForm.jsx
import React, { useState } from "react";
import { TextField, Button, CircularProgress, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { BASEURL } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";

const ShortenURLForm = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [shortURL, setShortURL] = useState("");
  const { token } = useAuth();

  // Validation function
  const validate = () => {
    const errors = {};
    if (!originalURL.trim()) {
      errors.originalURL = "URL is required";
    } else if (!/^https?:\/\/.+/i.test(originalURL.trim())) {
      errors.originalURL = "URL must start with http:// or https://";
    }

    if (customAlias && !/^[a-zA-Z0-9_-]{1,30}$/.test(customAlias)) {
      errors.customAlias =
        "Alias can only contain letters, numbers, underscores, dashes (max 30 chars)";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit handler
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

      if (!response.ok) {
        setError({ api: data.message || "Something went wrong." });
      } else {
        // Append shortcode to frontend base URL
        setShortURL(`${BASEURL}/${data.shortCode}`);
      }
    } catch (err) {
      setError({ api: err.message || "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Original URL"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
          error={!!error.originalURL}
          helperText={error.originalURL}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Custom Alias (optional)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          error={!!error.customAlias}
          helperText={error.customAlias}
          margin="normal"
        />

        {error.api && (
          <p style={{ color: "red", marginTop: 10 }}>{error.api}</p>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#EE6123",
            "&:hover": { backgroundColor: "#cc4f1a" },
          }}
          fullWidth
          disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Shorten"}
        </Button>
      </form>

      {shortURL && (
        <div
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
        </div>
      )}
    </div>
  );
};

export default ShortenURLForm;
