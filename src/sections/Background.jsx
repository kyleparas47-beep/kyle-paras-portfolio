import { education, experience, process } from "../data";

function Timeline({ title, items }) {
  return (
    <div className="card timeline-card">
      <h3 className="card-title">{title}</h3>
      <div className="timeline">
        {items.map((item) => (
          <article className="edu" key={item.title}>
            <h4>{item.title}</h4>
            <div className="meta">{item.meta}</div>
            {(item.lines ?? [item.body]).map((line) => (
              <p key={line}>{line}</p>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}

// Education, awards and working process in one wide section.
export default function Background() {
  return (
    <section className="page" id="background">
      <header className="section-head">
        <div className="eyebrow">Background</div>
        <h2 className="title">Education &amp; experience</h2>
      </header>

      <div className="background-grid">
        <Timeline title="Education" items={education} />
        <Timeline title="Awards & activities" items={experience} />
      </div>

      <div className="process">
        <h3 className="card-title">How I work</h3>
        <ol className="process-steps">
          {process.map((step, i) => (
            <li key={step.title}>
              <span className="step-no">{String(i + 1).padStart(2, "0")}</span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
