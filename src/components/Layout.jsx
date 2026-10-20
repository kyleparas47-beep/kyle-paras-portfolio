import { Link, Outlet } from "react-router-dom";
import { site } from "../data";
import CursorRing from "./CursorRing";
import ScrollManager from "./ScrollManager";
import Topbar from "./Topbar";

export default function Layout() {
  const socials = site.socials.filter((s) => s.url);
  return (
    <>
      <ScrollManager />
      <CursorRing />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Topbar />
      <main className="wrap" id="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <nav className="footer-links" aria-label="Footer">
            <Link to="/#projects">Work</Link>
            <Link to="/#contact">Contact</Link>
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
