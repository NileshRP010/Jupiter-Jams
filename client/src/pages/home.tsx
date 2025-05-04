import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LocationFilter } from "@/components/location-filter";
import { ShortFormVideos } from "@/components/short-form-videos";
import { LongFormVideo } from "@/components/long-form-video";
import { AnimatedOutro } from "@/components/animated-outro";
import { ProgressDashboard } from "@/components/progress-dashboard";
import { QRIntegration } from "@/components/qr-integration";
import { Footer } from "@/components/footer";
import { FloatingCTA } from "@/components/floating-cta";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState("All Cities");

  return (
    <>
      <Helmet>
        <title>Jupiter Jams - Street to Screen</title>
        <meta name="description" content="Jupiter Street to Screen — A Ground-Level to Global-Level Meme Video Series" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <Header />
      <Hero />
      <LocationFilter 
        selectedLocation={selectedLocation} 
        onLocationChange={(location) => setSelectedLocation(location)} 
      />
      <ShortFormVideos location={selectedLocation} />
      <LongFormVideo />
      <AnimatedOutro />
      <ProgressDashboard />
      <QRIntegration />
      <Footer />
      <FloatingCTA />
    </>
  );
}
