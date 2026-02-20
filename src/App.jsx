import Header from "./components/Header";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import ComparisonTable from "./components/ComparisonTable";
import Pillars from "./components/Pillars";
import ProductSpotlight from "./components/ProductSpotlight";
import ProjectsGallery from "./components/ProjectsGallery";
import Testimonials from "./components/Testimonials";
import LeadGenForm from "./components/LeadGenForm";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <ComparisonTable />
        <Pillars />
        <ProductSpotlight />
        <ProjectsGallery />
        <Testimonials />
        <LeadGenForm />
      </main>
      <Footer />
    </>
  );
}
