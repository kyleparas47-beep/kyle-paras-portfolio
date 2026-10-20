import { Link } from "react-router-dom";

// Renders a router <Link> for `to`, an <a> for `href`, otherwise a <button>.
export default function GlowButton({ to, href, className, children, onClick, type = "button", ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--bx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--by", `${e.clientY - r.top}px`);
  };
  const props = { className, onMouseMove: onMove, onClick, ...rest };
  if (to) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}
