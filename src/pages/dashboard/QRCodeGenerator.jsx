import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { BASEURL } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

const QRCodeGenerator = ({ shortCode }) => {
  const [qrImage, setQrImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const { token } = useAuth();

  const handleGenerate = async () => {
    if (!shortCode) return;

    setLoading(true);
    setQrImage(null);

    try {
      const response = await fetch(`${BASEURL}/api/v1/links/${shortCode}/qr`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch QR code");

      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);
      setQrImage(imgUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${BASEURL}/${shortCode}`);
    setToastOpen(true);
    setTimeout(() => setToastOpen(false), 1500);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = qrImage;
    a.download = `${shortCode}-qr.png`;
    a.click();
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
      {/* Top info */}
      <h3 style={{ marginBottom: "15px", fontWeight: "600" }}>
        Generate QR Code
      </h3>

      <Button
        variant="contained"
        onClick={handleGenerate}
        sx={{
          backgroundColor: "#EE6123",
          padding: "12px 24px",
          borderRadius: "8px",
          "&:hover": { backgroundColor: "#cc4f1a" },
        }}
        disabled={!shortCode}
        fullWidth>
        {loading ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          "Generate QR Code"
        )}
      </Button>

      {/* Loader */}
      {loading && (
        <Skeleton
          variant="rectangular"
          height={300}
          sx={{ borderRadius: 2, mt: 3 }}
        />
      )}

      {/* QR result */}
      {qrImage && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: "25px",
            padding: "20px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}>
          <div
            style={{
              borderRadius: "16px",
              padding: "20px",
              background: "#f8f9fa",
              display: "inline-block",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}>
            <img
              src={qrImage}
              alt="QR Code"
              style={{
                width: "260px",
                height: "260px",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "20px",
            }}>
            <Tooltip title="Copy URL">
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Download QR Code">
              <IconButton onClick={handleDownload}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </div>
        </motion.div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toastOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#4caf50",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              zIndex: 9999,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}>
            URL copied!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QRCodeGenerator;
