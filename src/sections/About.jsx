import TiltCard from "../components/TiltCard";
import { stats } from "../data";

export default function About() {
  return (
    <section className="page" id="about">
      <div className="about-grid">
        <header className="section-head">
          <div className="eyebrow">Profile</div>
          <h2 className="title">About me</h2>
        </header>
        <div className="about-body">
          <p className="about-lead">
            I'm a 4th-year Computer Science student with hands-on experience building full-stack web systems and designing user-focused interfaces.
          </p>
          <p>
            I can review an existing website and improve its layout, navigation, mobile responsiveness, and content structure. My foundation spans web development, databases, and user workflow analysis — I look at how people actually move through a site, then fix what's getting in their way.
          </p>
          <p>
            I also support basic on-page SEO: headings, titles, meta descriptions, and keyword-friendly structure.
          </p>
        </div>
        <TiltCard className="panel">
          <div className="dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          {stats.map((row) => (
            <div className="stat" key={row.k}>
              <span className="k">{row.k}</span>
              <span className="v">{row.v}</span>
            </div>
          ))}
        </TiltCard>
      </div>
    </section>
  );
}
