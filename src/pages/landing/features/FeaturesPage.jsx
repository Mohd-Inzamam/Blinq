// src/pages/FeaturesPage.jsx
import { Box, Typography, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import SectionContainer from "./SectionContainer";
import FeatureBlock from "./FeatureBlock";
import FaqAccordion from "../pricing/FaqAccordion";
import CTASection from "./CTASection";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const faqItems = [
    {
      question: "What can I do with Blinq?",
      answer:
        "You can shorten, brand, track, and manage all your links with powerful analytics and collaboration tools.",
    },
    {
      question: "Can I use custom domains?",
      answer:
        "Yes! Custom domains are available in Pro and Business plans for branding your short links.",
    },
    {
      question: "Does Blinq offer QR codes?",
      answer:
        "Yes, each link you create gets a QR code automatically, with customization in paid plans.",
    },
    {
      question: "Is Blinq good for teams?",
      answer:
        "Blinq Business provides team seats, permission control, and collaborative analytics.",
    },
  ];

  return (
    <Box>
      {/* =========================
          HERO SECTION
      ========================== */}
      <SectionContainer paddingY="80px">
        <Box textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Everything You Need to Grow Your Brand
            </Typography>

            <Typography
              sx={{
                fontSize: "18px",
                color: "#555",
                maxWidth: "750px",
                margin: "0 auto",
              }}>
              Create, manage, and track your links with the tools trusted by
              thousands of marketers, startups, and businesses.
            </Typography>

            <Box mt={4}>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                color="primary"
                sx={{
                  px: 4,
                  py: 1.6,
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "10px",
                  textTransform: "none",
                }}>
                Get Started Free
              </Button>
            </Box>
          </motion.div>
        </Box>
      </SectionContainer>

      {/* =========================
          FEATURE GRID (TOP)
      ========================== */}
      <SectionContainer background="#fff">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <FeatureBlock
              icon="🔗"
              title="Shorten & Share"
              description="Transform long URLs into simple, trackable short links that work anywhere."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureBlock
              icon="🎨"
              title="Brand Your Links"
              description="Use custom domains to build trust and create memorable, branded short links."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureBlock
              icon="📊"
              title="Advanced Analytics"
              description="Track clicks, locations, devices, referrers, and campaign performance."
            />
          </Grid>
        </Grid>
      </SectionContainer>

      {/* =========================
          IMAGE + TEXT HIGHLIGHT
      ========================== */}
      <SectionContainer background="#f5f5f5">
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
          {/* Text */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              Smarter Links for Better Engagement
            </Typography>
            <Typography
              sx={{ fontSize: "16px", color: "#555", lineHeight: 1.7, mb: 3 }}>
              Blinq gives you the tools to optimize every link — whether you're
              sharing on social media, running a marketing campaign, or tracking
              performance across multiple channels.
            </Typography>

            <Button
              component={Link}
              to="/pricing"
              variant="outlined"
              color="primary"
              sx={{
                px: 4,
                py: 1.3,
                fontSize: "16px",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 600,
              }}>
              See Pricing
            </Button>
          </Grid>

          {/* Image */}
          <Grid item xs={12} md={6}>
            <motion.img
              src="https://static.bitly.com/img/pages/home/campaigns-illustration.png"
              alt="Analytics Illustration"
              style={{
                width: "100%",
                maxWidth: "500px",
                margin: "0 auto",
                display: "block",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
          </Grid>
        </Grid>
      </SectionContainer>

      {/* =========================
          SECONDARY FEATURE GRID
      ========================== */}
      <SectionContainer background="#fff">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <FeatureBlock
              icon="⚙️"
              title="API & Automation"
              description="Integrate Blinq into your workflows with our powerful, developer-friendly API."
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureBlock
              icon="👥"
              title="Team Collaboration"
              description="Invite teammates, assign roles, and manage links together efficiently."
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureBlock
              icon="📱"
              title="QR Code Generator"
              description="Generate customizable QR codes instantly for offline and print campaigns."
            />
          </Grid>
        </Grid>
      </SectionContainer>

      {/* =========================
          FAQ SECTION
      ========================== */}
      <SectionContainer background="#f5f5f5">
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 4, fontWeight: 700 }}>
          Frequently Asked Questions
        </Typography>

        <FaqAccordion items={faqItems} />
      </SectionContainer>

      {/* =========================
          CTA SECTION
      ========================== */}
      <SectionContainer>
        <CTASection
          title="Start Building Smarter Links"
          subtitle="Join thousands of businesses using Blinq to manage, brand, and analyze their links."
          buttonText="Create Your First Link"
          buttonLink="/signup"
        />
      </SectionContainer>
    </Box>
  );
};

export default FeaturesPage;
