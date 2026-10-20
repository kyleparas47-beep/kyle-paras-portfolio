import { useEffect } from "react";
import { site } from "../data";
import GlowButton from "./GlowButton";

export default function ResumeModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="resume-overlay" role="dialog" aria-modal="true" aria-label="Resume">
      <div className="resume-sheet">
        <div className="resume-bar">
          <span>{site.name} — Resume</span>
          <div className="resume-bar-actions">
            <a className="btn ghost" href={site.resume} download={`${site.name.replaceAll(" ", "-")}-Resume.pdf`}>
              Download
            </a>
            <GlowButton className="btn primary" onClick={onClose} autoFocus>
              Close
            </GlowButton>
          </div>
        </div>
        <iframe className="resume-frame" title={`${site.name} resume`} src={site.resume} />
      </div>
    </div>
  );
}
