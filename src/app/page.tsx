import { Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ContactSection from '@/components/sections/ContactSection';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={
          <div className="h-screen flex flex-col items-center justify-center bg-card">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gradient text-lg font-medium">Loading Amazing Content...</p>
          </div>
        }>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
