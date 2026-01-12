import { Box } from "@mui/material";
import Features from "./sections/FeaturesSection";
import ProductShowcase from "./sections/ProductsSection";
import UnitelSection from "./sections/UnitelSection";
import Footer from "./sections/FooterSection";
import Hero from "./sections/HeroSection";

export default function LandingPage() {
    return (
        <Box>
            <Hero />
            <Features />
            <ProductShowcase />
            <UnitelSection />
            <Footer />
        </Box>
    );
}
