import { useRef } from "react";
import { skillGroups, tools } from "../data";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const reduced = usePrefersReducedMotion();
  const filled = inView || reduced;

  return (
    <section className="page" id="skills" ref={ref}>
      <header className="section-head">
        <div className="eyebrow">Toolkit</div>
        <h2 className="title">Skills &amp; tools</h2>
      </header>
      <div className="skills-layout">
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-cat card" key={group.title}>
              <h3>{group.title}</h3>
              {group.items.map((item) => (
                <div className="meter" key={item.name}>
                  <div className="meter-top">
                    <span>{item.name}</span>
                    <span className="lvl">
                      {item.level}
                      <span className="pct"> · {item.width}%</span>
                    </span>
                  </div>
                  <div className="track">
                    <div className="fill" style={{ width: filled ? `${item.width}%` : "0%" }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <aside className="tools card">
          <h3>Tools &amp; technologies</h3>
          {tools.map((t) => (
            <div className="tool-group" key={t.group}>
              <div className="tool-label">{t.group}</div>
              <ul className="stack">
                {t.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
