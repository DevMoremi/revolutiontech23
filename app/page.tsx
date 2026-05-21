import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhoWeAre from "@/components/WhoWeAre";
import CoreServices from "@/components/CoreServices";
import TrainingPrograms from "@/components/TrainingPrograms";
import WhyChooseUs from "@/components/WhyChooseUs";
import Faq from "@/components/Faq";
import EnrollmentForm from "@/components/EnrollmentForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Stats />
      <WhoWeAre />
      <CoreServices />
      <TrainingPrograms />
      <WhyChooseUs />
      <EnrollmentForm />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
