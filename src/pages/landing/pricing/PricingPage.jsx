// src/pages/PricingPage.jsx
import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";

// Components (correct paths)
import SectionContainer from "../features/SectionContainer";
import PricingToggle from "../pricing/PricingToggle";
import PricingCard from "../pricing/PricingCard";
import FeatureComparisonTable from "../pricing/FeatureComparisonTable";
import FeatureBlock from "../features/FeatureBlock";
import FaqAccordion from "../pricing/FaqAccordion";
import CTASection from "../features/CTASection";

const PricingPage = () => {
  const [billing, setBilling] = useState("monthly");

  // Price logic
  const pricingData = [
    {
      title: "Free",
      priceMonthly: "0",
      priceYearly: "0",
      features: [
        "Basic link shortening",
        "5 branded links / month",
        "Simple analytics",
        "1 user seat",
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
    {
      title: "Pro",
      priceMonthly: "12",
      priceYearly: "10",
      features: [
        "Unlimited link shortening",
        "50 branded links / month",
        "Advanced analytics",
        "UTM builder",
        "Priority redirects",
        "QR code customization",
      ],
      buttonText: "Start Pro",
      highlighted: true,
    },
    {
      title: "Business",
      priceMonthly: "35",
      priceYearly: "30",
      features: [
        "Unlimited links & branded links",
        "Team access (5 seats)",
        "API access",
        "Bulk link editing",
        "A/B testing",
        "Custom domains",
      ],
      buttonText: "Start Business",
      highlighted: false,
    },
  ];

  // FeatureComparison example data (pass to table)
  const comparisonPlans = pricingData.map((p) => ({
    name: p.title,
    highlight: p.highlighted,
  }));

  const comparisonFeatures = [
    {
      label: "Custom Domains",
      values: [false, true, true],
    },
    {
      label: "Advanced Analytics",
      values: [false, true, true],
    },
    {
      label: "API Access",
      values: [false, true, true],
    },
    {
      label: "Team Seats",
      values: [false, false, true],
    },
    {
      label: "QR Codes",
      values: [true, true, true],
    },
  ];

  // FAQ Data
  const faqItems = [
    {
      question: "Is there a free plan?",
      answer:
        "Yes, Blinq offers a fully functional free plan with basic analytics and link shortening.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade at any time from your dashboard settings.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Refunds are provided for yearly plans within the first 48 hours of purchase.",
    },
    {
      question: "Do plans include custom domains?",
      answer: "Custom domains are included in the Business plan and higher.",
    },
  ];

  return (
    <Box>
      {/* HERO */}
      <SectionContainer paddingY="60px">
        <Box textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}>
            <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Simple, Transparent Pricing
            </Typography>

            <Typography
              sx={{
                fontSize: "18px",
                color: "#555",
                maxWidth: "700px",
                margin: "0 auto",
              }}>
              Choose the perfect plan for your brand. Pay monthly or save with
              annual billing.
            </Typography>
          </motion.div>

          <Box mt={4}>
            <PricingToggle billing={billing} setBilling={setBilling} />
          </Box>
        </Box>
      </SectionContainer>

      {/* PRICING CARDS */}
      <SectionContainer background="#fff">
        <Grid container spacing={4} justifyContent="center">
          {pricingData.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <PricingCard {...plan} billing={billing} />
            </Grid>
          ))}
        </Grid>
      </SectionContainer>

      {/* FEATURE BLOCKS */}
      <SectionContainer background="#f5f5f5">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <FeatureBlock
              title="Smarter Link Management"
              description="Organize, tag, and sort links to track performance across campaigns."
              icon="🔗"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureBlock
              title="Powerful Analytics"
              description="Understand your audience with real-time click and geographic data."
              icon="📊"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureBlock
              title="Team Collaboration"
              description="Invite team members, manage permissions, and collaborate effectively."
              icon="👥"
            />
          </Grid>
        </Grid>
      </SectionContainer>

      {/* FEATURE COMPARISON TABLE (pass props) */}
      <SectionContainer background="#fff">
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 4, fontWeight: 700 }}>
          Compare All Features
        </Typography>
        <FeatureComparisonTable
          plans={comparisonPlans}
          features={comparisonFeatures}
        />
      </SectionContainer>

      {/* FAQ (pass faqs prop) */}
      <SectionContainer background="#f5f5f5">
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mb: 4, fontWeight: 700 }}>
          Frequently Asked Questions
        </Typography>
        <FaqAccordion faqs={faqItems} />
      </SectionContainer>

      {/* CTA */}
      <SectionContainer>
        <CTASection
          title="Ready to grow your brand with Blinq?"
          subtitle="Create, track, and optimize your links with powerful analytics and branding tools."
          buttonText="Get Started Free"
          buttonLink="/signup"
        />
      </SectionContainer>
    </Box>
  );
};

export default PricingPage;
