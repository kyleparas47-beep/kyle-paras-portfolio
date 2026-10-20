import { Link, useParams } from "react-router-dom";
import BarChart from "../components/BarChart";
import ProjectLinks from "../components/ProjectLinks";
import { findProject, projects } from "../data";
import { usePageMeta } from "../hooks/usePageMeta";
import NotFound from "./NotFound";

function Block({ label, children }) {
  return (
    <section className="cs-block">
      <div className="eyebrow">{label}</div>
      {children}
    </section>
  );
}

function List({ items }) {
  return (
    <ul className="cs-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function CaseStudy({ project }) {
  usePageMeta({ title: project.title, description: project.summary || project.problem });

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const facts = [
    { k: "Year", v: project.year },
    { k: "Role", v: project.role },
    { k: "Team", v: project.team },
    { k: "Focus", v: project.tags.join(" · ") },
  ].filter((f) => f.v);

  return (
    <article className="page case-study">
      <Link className="back" to="/#projects">
        ← cd ../projects
      </Link>
      {project.status ? (
        <div className="status-badge reveal">
          <span className="dot" aria-hidden="true" />
          {project.status}
        </div>
      ) : null}
      <div className="eyebrow reveal">Case study</div>
      <h1 className="cs-title reveal d1">{project.title}</h1>
      {project.summary ? <p className="lede reveal d2">{project.summary}</p> : null}

      <dl className="cs-facts reveal d3">
        {facts.map((f) => (
          <div key={f.k}>
            <dt>{f.k}</dt>
            <dd>{f.v}</dd>
          </div>
        ))}
      </dl>
      {project.stack?.length ? (
        <ul className="stack" aria-label="Tech stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      ) : null}
      <ProjectLinks links={project.links} />

      {project.cover ? (
        <figure className="cs-cover">
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            decoding="async"
            style={{ background: project.cover.bg }}
          />
          {project.cover.caption ? <figcaption>{project.cover.caption}</figcaption> : null}
        </figure>
      ) : null}

      <Block label="The problem">
        <p>{project.problem}</p>
      </Block>

      {project.features?.length ? (
        <Block label="What it does">
          <List items={project.features} />
        </Block>
      ) : null}

      {project.contributions?.length ? (
        <Block label="My contributions">
          <List items={project.contributions} />
        </Block>
      ) : null}

      <Block label="Approach">
        <p>{project.approach}</p>
        {project.process?.length ? (
          <ol className="cs-steps">
            {project.process.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </Block>

      {project.gallery?.length ? (
        <Block label="Screens">
          <div className="cs-gallery">
            {project.gallery.map((shot) => (
              <figure key={shot.src}>
                <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
                {shot.caption ? <figcaption>{shot.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </Block>
      ) : null}

      <Block label="Outcome">
        <p>{project.outcome}</p>
        {project.results?.length ? <List items={project.results} /> : null}
      </Block>

      {project.charts?.length ? (
        <Block label="Results at a glance">
          <div className="cs-charts">
            {project.charts.map((c) => (
              <BarChart
                key={c.title}
                title={c.title}
                caption={c.caption}
                data={c.data}
                max={c.max}
                highlight={c.highlight}
                reference={c.reference}
                valueLabel={c.valueLabel}
                format={(v) => (v === 0 ? "0" : v.toFixed(c.decimals ?? 2))}
              />
            ))}
          </div>
        </Block>
      ) : null}

      {project.learnings?.length ? (
        <Block label="What I learned">
          <List items={project.learnings} />
        </Block>
      ) : null}

      {next && next !== project ? (
        <Link className="cs-next" to={`/projects/${next.slug}`}>
          <span className="label">NEXT PROJECT</span>
          <span className="value">{next.title} →</span>
        </Link>
      ) : null}
    </article>
  );
}

export default function ProjectPage() {
  const project = findProject(useParams().slug);
  return project ? <CaseStudy key={project.slug} project={project} /> : <NotFound />;
}
