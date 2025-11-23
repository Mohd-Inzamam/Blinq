// src/pages/ResourcesPage.jsx
import { Box, Typography, Grid } from "@mui/material";
import SectionContainer from "../features/SectionContainer";
import ResourceCard from "./ResourceCard";

const ResourcesPage = () => {
  const resources = [
    {
      title: "Getting Started Guide",
      description:
        "Learn the basics of creating short links, customizing them, generating QR codes, and managing analytics.",
      image: "/assets/resources/guide.jpg",
      link: "#",
    },
    {
      title: "API Documentation",
      description:
        "Integrate our URL shortening API with your applications using REST APIs and secure authentication.",
      image: "/assets/resources/api.jpg",
      link: "#",
    },
    {
      title: "Case Studies",
      description:
        "See how businesses use our shortening service to improve engagement and track link performance.",
      image: "/assets/resources/case-study.jpg",
      link: "#",
    },
    {
      title: "Blog & Tutorials",
      description:
        "Tips, tricks, and tutorials on URL management, branding, and analytics best practices.",
      image: "/assets/resources/blog.jpg",
      link: "#",
    },
    {
      title: "Security Practices",
      description:
        "Understand our best practices for link safety, scam protection, and platform-level security.",
      image: "/assets/resources/security.jpg",
      link: "#",
    },
    {
      title: "FAQs & Troubleshooting",
      description:
        "Find answers to common questions about link creation, tracking, and account usage.",
      image: "/assets/resources/faq.jpg",
      link: "#",
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <SectionContainer background="#F9FAFB" paddingY="100px">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "32px", md: "48px" },
              color: "#222",
            }}>
            Resources & Learning Center
          </Typography>

          <Typography
            sx={{
              fontSize: "17px",
              color: "#555",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}>
            Explore guides, tutorials, documentation, and learning material to
            help you get the most out of our URL management platform.
          </Typography>
        </Box>
      </SectionContainer>

      {/* RESOURCE GRID SECTION */}
      <SectionContainer paddingY="60px">
        <Grid container spacing={4}>
          {resources.map((item, i) => (
            <Grid key={i} item xs={12} sm={6} md={4}>
              <ResourceCard {...item} />
            </Grid>
          ))}
        </Grid>
      </SectionContainer>
    </>
  );
};

export default ResourcesPage;
