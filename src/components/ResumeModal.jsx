import { useEffect } from "react";
import { createPortal } from "react-dom";
import { site } from "../data";
import GlowButton from "./GlowButton";

// Rendered into <body> through a portal: inside <main> it would sit in main's stacking
// layer, underneath the sticky top bar.
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

  return createPortal(
    <div
      className="resume-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="resume-sheet">
        <div className="resume-bar">
          <span>{site.name} — Resume</span>
          <div className="resume-bar-actions">
            <a className="btn ghost" href={site.resume} download={`${site.name.replaceAll(" ", "-")}-Resume.pdf`}>
              Download
            </a>
            <GlowButton className="btn primary resume-close" onClick={onClose} autoFocus aria-label="Close resume">
              <span aria-hidden="true">✕</span> Close
            </GlowButton>
          </div>
        </div>
        <iframe className="resume-frame" title={`${site.name} resume`} src={site.resume} />
      </div>
    </div>,
    document.body
  );
}
