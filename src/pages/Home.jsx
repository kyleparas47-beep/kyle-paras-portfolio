import { useCallback, useState } from "react";
import ResumeModal from "../components/ResumeModal";
import { usePageMeta } from "../hooks/usePageMeta";
import About from "../sections/About";
import Background from "../sections/Background";
import Contact from "../sections/Contact";
import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";

export default function Home() {
  usePageMeta();
  const [resumeOpen, setResumeOpen] = useState(false);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  return (
    <>
      <Hero onOpenResume={() => setResumeOpen(true)} />
      <About />
      <Projects />
      <Skills />
      <Background />
      <Contact />
      {resumeOpen ? <ResumeModal onClose={closeResume} /> : null}
    </>
  );
}
