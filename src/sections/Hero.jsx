import { useState } from "react";
import GlowButton from "../components/GlowButton";
import SplitName from "../components/SplitName";
import TiltCard from "../components/TiltCard";
import { highlights, roles, site } from "../data";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useTypewriter } from "../hooks/useTypewriter";

export default function Hero({ onOpenResume }) {
  const reduced = usePrefersReducedMotion();
  const role = useTypewriter(roles, reduced);
  const [photoOk, setPhotoOk] = useState(Boolean(site.photo?.src));

  return (
    <section className="hero" id="home">
      <div className={`hero-grid${photoOk ? " with-photo" : ""}`}>
        <div className="hero-copy">
          <div className="role reveal">
            <span className="role-prefix">&gt;</span> {role}
            <span className="bar" />
          </div>
          <h1 className="hero-name reveal d1">
            <SplitName text="Kyle Justine" />
            <SplitName className="name-green" text="Paras" />
          </h1>
          <p className="lede reveal d2">
            Computer Science student building full-stack web systems and the interfaces on top of them — with an eye for usability, structure, and clean execution.
          </p>
          <div className="actions reveal d3">
            <GlowButton className="btn primary" to="/#projects">
              View my work <span aria-hidden="true">→</span>
            </GlowButton>
            <GlowButton className="btn ghost" onClick={onOpenResume}>
              View resume
            </GlowButton>
          </div>
        </div>
        {photoOk ? (
          <div className="hero-visual reveal d2">
            <span className="hero-arc" aria-hidden="true" />
            <TiltCard className="hero-photo">
              <img
                src={site.photo.src}
                alt={site.photo.alt}
                width="600"
                height="600"
                fetchPriority="high"
                onError={() => setPhotoOk(false)}
              />
            </TiltCard>
            <div className="hero-badge">
              <span className="dot" aria-hidden="true" />
              <span>
                Open to
                <b>Internships</b>
              </span>
            </div>
          </div>
        ) : null}
      </div>
      <dl className="highlights reveal d3">
        {highlights.map((h) => (
          <div className="highlight" key={h.label}>
            <dt>{h.label}</dt>
            <dd>{h.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
