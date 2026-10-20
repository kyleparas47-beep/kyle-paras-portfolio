export default function ProjectLinks({ links }) {
  const items = [
    { label: "Source", url: links?.github },
    { label: "Live site", url: links?.live },
  ].filter((item) => item.url);
  if (!items.length) return null;
  return (
    <div className="project-links">
      {items.map((item) => (
        <a key={item.label} className="btn ghost small" href={item.url} target="_blank" rel="noreferrer">
          {item.label} ↗
        </a>
      ))}
    </div>
  );
}
