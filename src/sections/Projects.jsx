import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TiltCard from "../components/TiltCard";
import { otherProjects, projects } from "../data";

const ALL = "All";

function WorkCard({ project, index, featured = false }) {
  return (
    <TiltCard as="article" className={`work-card${featured ? " featured" : ""}`}>
      <Link className="work-link" to={`/projects/${project.slug}`} aria-label={`${project.title} case study`} />
      <div className="work-cover">
        {project.cover ? (
          <img
            src={project.cover.thumb ?? project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            loading="lazy"
            decoding="async"
            style={{
              objectFit: project.cover.fit ?? "cover",
              objectPosition: project.cover.position ?? "center top",
              background: project.cover.bg,
            }}
          />
        ) : (
          <div className="work-cover-art" aria-hidden="true">
            <span className="work-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="work-year">{project.year}</span>
          </div>
        )}
      </div>
      <div className="work-main">
        <div className="work-body">
          {project.status ? (
            <div className="status-badge">
              <span className="dot" aria-hidden="true" />
              {featured ? "Currently working on · " : ""}
              {project.status}
            </div>
          ) : null}
          <div className="work-tags">{project.tags.join(" · ")}</div>
          <h3>{project.title}</h3>
          <p>{project.summary || project.problem}</p>
          {project.role ? (
            <div className="work-role">
              <b>Role</b> {project.role}
            </div>
          ) : null}
          {project.stack?.length ? (
            <ul className="stack" aria-label="Tech stack">
              {project.stack.slice(0, featured ? 9 : 5).map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
              {project.stack.length > (featured ? 9 : 5) ? (
                <li>+{project.stack.length - (featured ? 9 : 5)}</li>
              ) : null}
            </ul>
          ) : null}
        </div>
        <div className="work-foot">
          <span>Read case study</span>
          <span className="work-arrow" aria-hidden="true">↗</span>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState(ALL);
  const tags = useMemo(() => [...new Set(projects.flatMap((p) => p.tags))], []);
  // A filter only helps once some tag narrows the list down.
  const showFilter = tags.some((tag) => projects.some((p) => !p.tags.includes(tag)));
  const visible = filter === ALL ? projects : projects.filter((p) => p.tags.includes(filter));
  // Work with a status (e.g. the thesis) gets a full-width spotlight above the grid.
  const current = visible.filter((p) => p.status);
  const finished = visible.filter((p) => !p.status);

  return (
    <section className="page" id="projects">
      <header className="section-head split">
        <div>
          <div className="eyebrow">Featured work</div>
          <h2 className="title">Projects</h2>
        </div>
        {showFilter ? (
          <div className="filters" role="group" aria-label="Filter projects">
            {[ALL, ...tags].map((tag) => (
              <button
                key={tag}
                type="button"
                className={`chip filter${filter === tag ? " on" : ""}`}
                aria-pressed={filter === tag}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </header>
      {current.map((project) => (
        <WorkCard key={project.slug} project={project} index={projects.indexOf(project)} featured />
      ))}
      {finished.length ? (
        <div className="work-grid" style={{ "--cols": Math.min(finished.length, 4) }}>
          {finished.map((project) => (
            <WorkCard key={project.slug} project={project} index={projects.indexOf(project)} />
          ))}
        </div>
      ) : null}
      {otherProjects.length ? (
        <div className="other-projects">
          <h3 className="card-title">Other projects</h3>
          <ul>
            {otherProjects.map((p) => {
              const href = p.links?.live || p.links?.github;
              return (
                <li key={p.title}>
                  <span className="other-year">{p.year}</span>
                  <div className="other-main">
                    <h4>
                      {href ? (
                        <a href={href} target="_blank" rel="noreferrer">
                          {p.title} <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        p.title
                      )}
                    </h4>
                    {p.description ? <p>{p.description}</p> : null}
                    {p.role ? (
                      <div className="work-role">
                        <b>Role</b> {p.role}
                      </div>
                    ) : null}
                  </div>
                  {p.stack?.length ? (
                    <ul className="stack" aria-label="Tech stack">
                      {p.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
